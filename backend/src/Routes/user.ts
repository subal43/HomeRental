import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@subal999/homerent-package"

import { Resend } from "resend";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
    RESEND_API_KEY: string
  }
}
>()

userRouter.post('/signup', async (c) => {
  console.log("Signup route hit");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log("Request body:", body);
  const { success } = signupInput.safeParse(body);
  console.log(success)
  if (!success) {
    return c.json({
      msg: "Invalid input"
    }, 400);
  }

  console.log("Parsed body:", body);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });

  if (existingUser) {
    return c.json({
      msg: "User already exists"
    }, 400);
  }

  if (!c.env.JWT_SECRET) {
    return c.json({ error: "JWT_SECRET is missing" }, 500);
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      contact: body.contact,
      password: body.password,
      name: body.name,
    }
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token
  });
});


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body)
  if (!success) {
    return c.json({
      msg: "Invalid input"
    }, 400)
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,

    }
  })

  if (!user) {
    return c.json({
      msg: "Invalid credentials"
    }, 401)
  }

  if (user.password !== body.password) {
    return c.json({
      msg: "Invalid credentials"
    }, 401)
  }
  try {
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({
      jwt: token
    })
  } catch (e) {
    return c.json({
      msg: "Error signing token"
    }, 500)
  }
})

userRouter.get("/contact", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: body.ownerId,
      },
      select: {
        contact: true,
        email: true,
        name: true,
      }
    })
    return c.json({
      user
    });
  } catch (error) {
    c.status(404);
    return c.json({
      error: "User not found"
    });
  }

})




userRouter.post('/contact-owner', async (c) => {
  const { email, message ,to } = await c.req.json();

  const resend = new Resend(c.env.RESEND_API_KEY);

  if (!email || !message) {
    return c.json({ error: 'Email and message are required.' }, 400);
  }

  try {
    await resend.emails.send({
      from: 'no-reply@subalkundu.click',
      to,
      subject: 'Flat Inquiry',
      replyTo: email,
      html: `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    });

    return c.json({ success: true });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to send email.' }, 500);
  }
});


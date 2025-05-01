import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
import { createPostInput, updatePostInput } from '@subal999/common'

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}
>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header('Authorization') || ""
  const token = authHeader.split(' ')[1] || ""
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    
   
    if (user) {
      
      c.set('userId', user.id as string);
      await next();
    } else {
      
      return c.json({ error: 'Unauthorized' }, 401)
      console.log("hi there")
    }
  } catch (e) {
    
    return c.json({ error: 'Unauthorized' }, 401)
  }
})



blogRouter.post('/post', async (c) => {
  const body = await c.req.json()

  const { success } = createPostInput.safeParse(body)
  if (!success) {
    return c.json({
      msg: "Invalid input"
    }, 400)
  }
  const authorId = c.get('userId')

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorid: authorId
    }
  })

  return c.json({
    id: blog.id
  });
})

// blogRouter.put('/update', async (c) => {
//   const body = await c.req.json()
//   const { success } = updatePostInput.safeParse(body)
//   if (!success) {
//     return c.json({
//       msg: "Invalid input"
//     }, 400)
//   }
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())
//   const blog = await prisma.post.update({
//     where: {
//       id: body.id,
//     },
//     data: {
//       title: body.title,
//       content: body.content,

//     }
//   })

//   return c.json({
//     id: blog.id
//   });

// })


blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const blog = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,

          }
        }
      }
    });
    return c.json({
      blog
    });
  } catch (error) {
    c.status(404)
    return c.json({
      error: "Blogs not found"
    })
  }

})


blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      }, select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          }
        }
      }

    })
    return c.json({
      blog
    });


  } catch (error) {
    c.status(404)
    return c.json({
      error: "Blog not found"
    })
  }
})

blogRouter.post('/authorname', async (c) => {

  const authorId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const blog = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
      select: {
        name: true,
      }


    })
    if (!blog) {
      c.status(404)
      return c.json({
        error: "Blog not found"
      })
    }
    return c.json({
      blog
    });


  } catch (error) {
    c.status(404)
    return c.json({
      error: "Blog not found"
    })
  }
})


blogRouter.delete('/delete/:id', async (c) => {
  console.log("hi there")
  const id = c.req.param("id")
  console.log(id)
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const blog = await prisma.post.delete({
      where: {
        id: id,
      }
    })
    return c.json({
      msg: "Blog deleted"
    });


  } catch (error) {
    c.status(404)
    return c.json({
      error: "Blog not found"
    })
  }
})



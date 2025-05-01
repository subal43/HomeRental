import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import { signinInput, signupInput } from '@subal999/common'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET : string
    }
  }
  >()

userRouter.post('/signup',async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const body = await c.req.json();
const {success} = signupInput.safeParse(body)
if(!success){
  return c.json({
    msg:"Invalid input"
  },400)
}
const existingUser = await prisma.user.findUnique({
  where:{
    email:body.email
  }
})
if(existingUser){
  return c.json({
    msg:"User already exists"
  },400);
}

if (!c.env.JWT_SECRET) {
  return c.json({ error: "JWT_PRIVATE_KEY is missing" }, 500);
}

 const user = await prisma.user.create({
  data:{
    email:body.email,
    password :body.password,
    name:body.name,
  }
})

const token = await sign({id:user.id},c.env.JWT_SECRET)

return c.json({
  jwt : token
})
})



userRouter.post('/signin',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const body = await c.req.json();
const {success} = signinInput.safeParse(body)
if(!success){
  return c.json({
    msg:"Invalid input"
  },400)
}

const user = await prisma.user.findUnique({
  where:{
    email:body.email,
   
  }
})

if(!user){
  return c.json({
    msg:"Invalid credentials"
  },401)
}

if(user.password !== body.password){
  return c.json({
    msg:"Invalid credentials"
  },401)
}
try{
const token = await sign({id:user.id},c.env.JWT_SECRET)
return c.json({
  jwt : token
})
}catch(e){
  return c.json({
    msg:"Error signing token"
  },500)  
}
})
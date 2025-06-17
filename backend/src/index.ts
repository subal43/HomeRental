import { Hono } from 'hono'
import { userRouter } from './Routes/user'
import { RentRouter } from './Routes/rent'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET : string
    RESEND_API_KEY: string
  }
}
>();
app.use('/api/*', cors())

app.route('/api/v1/user',userRouter);
app.route('/api/v1/rent',RentRouter);







export default app

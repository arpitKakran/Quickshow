import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/show.routes.js'
import bookingRouter from './routes/booking.routes.js'
import adminRouter from './routes/admin.routes.js'
import userRouter from './routes/user.routes.js'
import { stripeWebhooks } from './controllers/stripeWebhooks.js'

const app= express()
const port=3000

await connectDB()

app.use('/api/stripe',express.raw({type: 'application/json'}),stripeWebhooks)

app.use(express.json())
app.use(cors())

app.use(clerkMiddleware())

//API ROUTES
app.get('/',(req,res)=> res.send('Dhan Dhan Satguru Tera Hi Aasra'))

app.use('/api/inngest',serve({ client: inngest, functions }))

app.use('/api/show',showRouter)

app.use('/api/booking',bookingRouter)

app.use('/api/admin', adminRouter)

app.use('/api/user',userRouter)

app.listen(port,()=> console.log(`Server listening at http://localhost:${port}`))
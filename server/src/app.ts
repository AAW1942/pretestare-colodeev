import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import socketio from 'socket.io';
import http from 'http';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'

if (process.env.NODE_ENV === 'dev') {
	dotenv.config({ path: '.env.dev' });
} else {
	dotenv.config();
}


// import { userRoutes } from './routes/userRoutes';
// import { postRoutes } from './routes/postRoutes';

const app: Application = express();
const server = http.createServer(app);
// const io = socketio(server);

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/auth', authRoutes)

const mongoURI = process.env.MONGODB_URI ?? ''

mongoose.set('strictQuery', false)

mongoose.connect(mongoURI)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB', error);
	})

export { server }//, io }


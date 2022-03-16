import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import path from 'path';
import { connectMongoDB } from './src/database/config';
import rotues from './src/routes';

dotenv.config();
const PORT = process.env.PORT || 8088;

const app = express();
const server = createServer(app);
connectMongoDB();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(path.resolve(), 'uploads')));
app.use('/api', rotues);

server.listen(PORT, () => {
  console.log(`Server is runing at port ${PORT}`);
});

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import { connectMongoDB } from './src/database/config';
import rotues from './src/routes';

dotenv.config();
const PORT = process.env.PORT || 8088;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();

app.use('/api', rotues);

server.listen(PORT, () => {
  console.log(`Server is runing at port ${PORT}`);
});

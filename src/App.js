import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRouter';
import taskRoutes from './routes/taskRoutes';
import loginRoutes from './routes/loginRouter';

import './database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user/', userRoutes);
    this.app.use('/task/', taskRoutes);
    this.app.use('/login', loginRoutes);
  }
}

export default new App().app;

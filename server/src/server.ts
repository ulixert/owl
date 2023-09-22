import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './db/connectDB.js';

dotenv.config();
void connectDB();
const app = express();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`),
);

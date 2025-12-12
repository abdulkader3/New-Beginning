import dotenv from 'dotenv';
import { ConnectDB } from './db/index.js';
dotenv.config('./.env')
ConnectDB()
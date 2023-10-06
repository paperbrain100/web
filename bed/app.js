import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import user from './routes/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

if (supabase) {
  console.log('Supabase connected');
}

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PaperBrain' });
});

app.use('/user', user);

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

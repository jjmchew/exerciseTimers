import express from 'express';
import cors from 'cors';
import db from './db.json' assert { type: 'json' };

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/workouts', (_req, res) => {
  res.send(db);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


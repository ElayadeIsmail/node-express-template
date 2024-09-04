import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ message: 'Login Endpoint' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'register Endpoint' });
});

export { router as authRouter };

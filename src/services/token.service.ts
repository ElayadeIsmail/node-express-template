import { envVars, logger } from '@/config';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  username: string;
}
const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, envVars.jwtSecret, {
    expiresIn: envVars.sessionExpiresInMs / 1000,
  });
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, envVars.jwtSecret) as TokenPayload;
    return decoded;
  } catch (error) {
    logger.error('Error verifying token:', error);
    return null;
  }
};

export default { generateToken, verifyToken };

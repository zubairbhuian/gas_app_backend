import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecretKey } from "../utils/secret";

// Extend Request interface to include userId property
interface AuthenticatedRequest extends Request {
    userId?: string;
}

// Verify token middleware
function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.userId = (decoded as JwtPayload).userId as string;
      next();

    });
}

export default verifyToken;
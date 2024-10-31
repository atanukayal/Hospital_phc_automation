import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is the same secret

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Attach user info to the request
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

export default authMiddleware;

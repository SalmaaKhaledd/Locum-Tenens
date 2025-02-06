const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ error: 'No token, Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;   // Attach user data to request
    next();
  }catch(err){
    res.status(401).json({error: 'Token is not valid'});
  }
}

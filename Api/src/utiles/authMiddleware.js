import jwt from 'jsonwebtoken';

//Checks if the user is logged in.
//performs same check for every route
export const authUser = (req, res, next) => {
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
//Checks if the user has the right role.
//higher-order function that checks for different roles on different routes
export const authRole = (roles) =>{
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({error: 'Unauthorized'});
    }
    next();
  }
}
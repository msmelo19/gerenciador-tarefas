import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = data.id;
    req.userEmail = data.email;
    next();
  } catch (err) {
    return res.status(401).json({
      errors: ['Token expired or invalid'],
    });
  }
};

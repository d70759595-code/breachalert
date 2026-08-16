const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  // Check HttpOnly cookie first, then fallback to Authorization header for backward compatibility
  let token = req.cookies ? req.cookies.token : null;

  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required. Missing token or session cookie.' }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev_only');
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid or expired authentication session.' }
    });
  }
}

module.exports = requireAuth;
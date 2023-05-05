const isAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization === "admin") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access.." });
  }
};
module.exports = isAdmin;

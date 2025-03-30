export function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Você precisa estar logado!" });
    }
    next();
  }
  
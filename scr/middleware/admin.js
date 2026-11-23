export const authorizeAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Admin privileges required." });
    }
    next();
  } catch (error) {
    console.error("Error in authorizeAdmin middleware:", error);
    res.status(500).json({message: error.message});
  }
};
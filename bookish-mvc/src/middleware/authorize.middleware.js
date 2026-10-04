const authorize = (...roles) => {
    return (req, res, next) => {
        const currentRole = req.user.role;
        if (!roles.includes(currentRole)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission to perform this action."
            });
        }
        next();
    }
};

export default authorize;

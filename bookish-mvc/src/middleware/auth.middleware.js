import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT tokens and secure private endpoints.
 * Expects header format: Authorization: Bearer <token>
 */
export const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Authentication token missing or malformed."
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token verification failed."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        // Catch expired token issues specifically to guide the frontend client
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. Token has expired."
            });
        }

        // Handle invalid signatures or altered tokens
        return res.status(403).json({
            success: false,
            message: "Authentication failed. Token is invalid or modified."
        });
    }
};
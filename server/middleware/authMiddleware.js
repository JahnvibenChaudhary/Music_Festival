const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    // 1. Get the Authorization header
    const authHeader = req.headers["authorization"];

    // 2. Check that a token was provided
    if (!authHeader) {
        return res.status(401).json({
            message: "Access token is required"
        });
    }

    // 3. Extract the token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid authorization format"
        });
    }

    // 4. Verify the JWT
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Store the decoded user information on req.user
        req.user = decoded;

        // 6. Continue to the protected route
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}


function requireRole(role) {
    return function (req, res, next) {
        // 1. Check req.user exists
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // 2. Compare req.user.role with the required role
        // 3. Allow the request if the roles match
        if (req.user.role === role) {
            return next();
        }

        // 4. Otherwise return 403
        return res.status(403).json({
            message: "Access denied"
        });
    };
}


module.exports = {
    authenticateToken,
    requireRole
};
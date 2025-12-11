import jwt from 'jsonwebtoken';


export const isAuthenticated = (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: 'Authentication token missing',
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            });
        }
        req.user = decoded;
        next();
    }

    catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            message: 'Invalid or expired token',
            success: false
        });
    }
}

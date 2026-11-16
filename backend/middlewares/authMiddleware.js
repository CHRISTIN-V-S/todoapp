const jwt = require("jsonwebtoken");
const JWT_SECRET = "christodo@1122";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
                console.log("auth",authHeader)


        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        const token = authHeader.split(" ")[1];
        console.log("middleware", token)


        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();

    } catch (error) {
        console.log(error)
         res.status(401).json({
            message: "Please login first"
        });
    }
}

module.exports = authMiddleware;
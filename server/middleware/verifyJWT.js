import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyJWT = async (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer"))
		return res.status(401).json({ message: `Unauthorized` });
	const token = authHeader.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: payload.id };
		next();
	} catch (error) {
		console.log(error);
	}
};

export default verifyJWT;

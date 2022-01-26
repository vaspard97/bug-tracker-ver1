import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createJWT = ({ payload }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET);
	return token;
};

export const isTokenValid = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

export const attachCookiesToResponse = ({ res, user, refreshToken }) => {
	const accessTokenJWT = createJWT({ payload: { user } });
	const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

	const oneDay = 1000 * 60 * 60 * 24;

	res.cookie("accessToken", accessTokenJWT, {
		httpOnly: true,
		maxAge: 1000 * 60 * 15,
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});

	res.cookie("refreshToken", refreshTokenJWT, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});
};

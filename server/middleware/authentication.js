import { isTokenValid } from "../utils/index.js";
import { TokenModel } from "../models/token.js";
import { attachCookiesToResponse } from "../utils/index.js";
import dotenv from "dotenv";
dotenv.config();

//same as verify jwt
export const authenticateUser = async (req, res, next) => {
	const { refreshToken, accessToken } = req.signedCookies;
	try {
		if (!refreshToken) {
			return res.status(401).json({ message: "Unauthorized", success: false });
		}

		if (accessToken) {
			const payload = isTokenValid(accessToken);
			req.user = payload.user;
			return next();
		}

		const payload = isTokenValid(refreshToken);

		const existingRefreshToken = await TokenModel.findOne({
			user: payload.user.id,
			refreshToken: payload.refreshToken,
		});

		if (!existingRefreshToken || !existingRefreshToken?.isValid || !payload) {
			return res.status(401).json({ message: "Unauthorized", success: false });
		}
		attachCookiesToResponse({
			res,
			user: payload.user,
			refreshToken: existingRefreshToken.refreshToken,
		});
		req.user = payload.user;
		next();
	} catch (error) {
		res.status(500).json({ message: "Something Went Wrong", success: false });
	}
};

//same as verifyRoles
export const authorizedPermission = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.user.roles)
			return res.status(401).json({ message: "Unauthorized" });

		if (!allowedRoles.includes(req.user.roles))
			return res.status(401).json({ message: "Unauthorized" });

		next();
	};
};

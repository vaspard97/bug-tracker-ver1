import nodeMailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig.js";
export const sendEmail = async ({ to, subject, html }) => {
	const transporter = nodeMailer.createTransport(nodemailerConfig);
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to,
		subject,
		html,
	};

	return transporter.sendMail(mailOptions);
};

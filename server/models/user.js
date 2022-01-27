import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	firstName: { type: String, require: true },
	lastName: { type: String, require: true },
	email: { type: String, require: true },
	roles: {
		type: String,
		default: "developer",
		enum: ["developer", "tech lead", "admin"],
	},
	password: { type: String, require: true },
	verificationToken: String,
	isVerified: { type: Boolean, default: false },
	verified: Date,
});

const userModels = mongoose.model("User", userSchema);

export default userModels;

import mongoose from "mongoose";

const schemaProject = mongoose.Schema(
	{
		title: { type: String, required: [true, "Please provide project name"] },
		description: {
			type: String,
			required: [true, "Please provide project description"],
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please Provide User"],
		},
		developers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
		tickets: [{ type: mongoose.Types.ObjectId, ref: "Ticket" }],
	},
	{ timestamps: true }
);

const projectModels = mongoose.model("Project", schemaProject);

export default projectModels;

import mongoose from "mongoose";

const schemaTicket = mongoose.Schema(
	{
		title: { type: String, required: [true, "Please provide project name"] },
		description: {
			type: String,
			required: [true, "Please provide project description"],
		},
		priority: {
			type: String,
			default: "medium",
			enum: ["low", "medium", "high"],
		},
		status: {
			type: String,
			default: "open",
			enum: ["open", "progress", "resolved"],
		},
		issuedBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please Provide User"],
		},
		developers: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
				required: [true, "Please Provide Developer"],
			},
		],

		projectId: {
			type: mongoose.Types.ObjectId,
			ref: "Project",
			required: true,
		},
	},
	{ timestamps: true }
);

const ticketModels = mongoose.model("Tickets", schemaTicket);

export default ticketModels;

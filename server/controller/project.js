import ProjectModels from "../models/projects.js";
import UserModels from "../models/user.js";

export const getOneProject = async (req, res) => {
	const { id } = req.params;

	try {
		const assignedProject = await ProjectModels.findOne({
			_id: id,
			developers: req.user.id,
		})
			.populate({ path: "developers", select: "-password -isVerified" })
			.populate({ path: "createdBy", select: "-password -isVerified" });

		if (!assignedProject)
			return res.status(404).json({ message: "Project Does Not Exist" });
		return res.status(200).json({
			assignedProject,
		});
	} catch (error) {
		return res.status(404).json({ message: "Project Does Not Exist" });
	}
};

export const getProjects = async (req, res) => {
	try {
		const assignedProject = await ProjectModels.find({
			$or: [{ developers: req.user.id }, { createdBy: req.user.id }],
		}).populate({ path: "createdBy", select: "-password -isVerified" });

		return res.status(200).json(assignedProject);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const createProject = async (req, res) => {
	req.body.createdBy = req.user.id;
	const { developers } = req.body;

	try {
		const value = await developers.map((item) => item.value);

		const project = await ProjectModels.create({
			...req.body,
			developers: value,
		});

		return res.status(200).json(project);
	} catch (error) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};

export const updateProject = async (req, res) => {
	const { id } = req.params;
	const { developers } = req.body;
	try {
		const value = await developers.map((item) => item.value);
		const project = await ProjectModels.findOneAndUpdate(
			{ $and: [{ _id: id }, { createdBy: req.user.id }] },
			{
				...req.body,
				developers: value,
			},
			{
				new: true,
				runValidators: true,
			}
		).populate({ path: "createdBy", select: "firstName lastName" });

		if (!project) {
			return res.status(404).json({ message: "Project Does not exist" });
		}
		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

export const getUsers = async (req, res) => {
	//get all user fill up form
	try {
		const users = await UserModels.find({}).select(
			"-password -roles -verificationToken"
		);

		return res.status(200).json({ users });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "something went wrong" });
	}
};

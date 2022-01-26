import ProjectModels from "../models/projects.js";
import TicketModels from "../models/tickets.js";
export const createTicket = async (req, res) => {
	req.body.issuedBy = req.user.id;
	const { developers, priority, status } = req.body;

	try {
		const developerValue = await developers.map((item) => item.value);

		const newTicket = await TicketModels.create({
			...req.body,
			developers: developerValue,
			priority: priority.value,
			status: status.value,
			projectId: req.params.projectid,
		});

		const result = await TicketModels.findById(newTicket._id)
			.populate({ path: "issuedBy", select: "firstName lastName" })
			.populate([{ path: "developers", select: "firstName lastName" }]);

		const findProject = await ProjectModels.findOneAndUpdate(
			{ _id: req.params.projectid },
			{ $addToSet: { tickets: newTicket._id } },
			{ new: true, runValidators: true }
		);
		res.status(200).json({ result, findProject });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "something went wrong" });
	}
};
export const getTickets = async (req, res) => {
	try {
		const ticket = await TicketModels.find({
			projectId: req.params.projectid,
		})
			.populate({ path: "issuedBy", select: "firstName lastName" })
			.populate([{ path: "developers", select: "firstName lastName" }]);

		if (!ticket) res.status(404).json({ message: "Ticket Not Found" });
		return res.status(200).json(ticket);
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

export const getUpdatableTickets = async (req, res) => {
	try {
		const ticket = await TicketModels.find({
			$or: [{ developers: req.user.id }, { issuedBy: req.user.id }],
		})
			.populate({ path: "issuedBy", select: "firstName lastName" })
			.populate([{ path: "developers", select: "firstName lastName" }]);

		if (!ticket) {
			return res.status(404).json({ message: "Ticket Not Found" });
		}
		return res.status(200).json(ticket);
	} catch (error) {
		return res.status(500).json({ message: "something went wrong" });
	}
};

export const getOneTicket = async (req, res) => {
	const { ticketid } = req.params;
	try {
		const ticket = await TicketModels.findById(ticketid);
		res.status(200).json(ticket);
	} catch (error) {
		res.status(500).json({ message: "something went wrong" });
	}
};
export const updateTicket = async (req, res) => {
	const { ticketid } = req.params;
	const { description, title, status, priority, developers } = req.body;

	try {
		const developerValue = await developers.map((item) => item.value);

		const ticket = await TicketModels.findOneAndUpdate(
			{ _id: ticketid },
			{
				description: description,
				title: title,
				developers: developerValue,
				priority: priority.value,
				status: status.value,
			},

			{ new: true, runValidators: true }
		)
			.populate({ path: "issuedBy", select: "firstName lastName" })
			.populate([{ path: "developers", select: "firstName lastName" }]);

		if (!ticket) res.status(404).json({ message: "Ticket Does Not Exist" });

		res.status(200).json(ticket);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};
export const deleteTicket = async (req, res) => {
	const { ticketid } = req.params;

	try {
		const ticket = await TicketModels.findOneAndDelete({
			_id: ticketid,
		});
		if (!ticket) res.status(404).json({ message: "Ticket Not Found" });
		res.send();
	} catch (error) {
		res.status(500).json({ message: "something went wrong" });
	}
};

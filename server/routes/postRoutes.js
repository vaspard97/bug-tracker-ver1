import express from "express";
import {
	createProject,
	getOneProject,
	getProjects,
	updateProject,
	getUsers,
} from "../controller/project.js";
import {
	createTicket,
	getTickets,
	getOneTicket,
	updateTicket,
	deleteTicket,
	getUpdatableTickets,
} from "../controller/tickets.js";

import {
	authenticateUser,
	authorizedPermission,
} from "../middleware/authentication.js";

const route = express.Router();

route.get("/users", authenticateUser, getUsers); //only team lead use for creatin first
route.get("/projects/:id", authenticateUser, getOneProject); //all team members
route.get("/projects", authenticateUser, getProjects); //all team member
route.post("/projects", authenticateUser, createProject); //only team lead
route.patch("/projects/:id", authenticateUser, updateProject); //only team lead

route.post("/projects/:projectid/ticket", authenticateUser, createTicket);
route.get("/projects/:projectid/ticket", authenticateUser, getTickets);

route.get("/myticket", authenticateUser, getUpdatableTickets);
route.patch("/myticket/:ticketid", authenticateUser, updateTicket);
export default route;

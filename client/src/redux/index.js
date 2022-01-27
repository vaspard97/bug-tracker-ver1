import { combineReducers } from "redux";
import { userReducers } from "./reducers/user";
import { verificationReducer } from "./reducers/verification";
import { signUpReducers } from "./reducers/signUpReducer";
import { getAllUserReducer } from "./reducers/getAllUsersReducers";
import { ticketReducers } from "./reducers/ticketReducers";
import { updatableTicketReducers } from "./reducers/updatableTicketsReducers";
import { projectReducers } from "./reducers/projectReducers";
export default combineReducers({
	userReducers,
	projectReducers,
	verificationReducer,
	signUpReducers,
	getAllUserReducer,
	ticketReducers,
	updatableTicketReducers,
});

import { combineReducers } from "redux";
import { userReducers } from "./reducers/user";
import { postReducer } from "./reducers/post";
import { authReducer } from "./reducers/auth";
import { signUpReducers } from "./reducers/signUpReducer";
import { getAllUserReducer } from "./reducers/getAllUsersReducers";
import { getAllProjectsReducers } from "./reducers/getAllProjectReducers";
import { ticketReducers } from "./reducers/ticketReducers";
import { updatableTicketReducers } from "./reducers/updatableTicketsReducers";
export default combineReducers({
	userReducers,
	postReducer,
	authReducer,
	signUpReducers,
	getAllUserReducer,
	getAllProjectsReducers,
	ticketReducers,
	updatableTicketReducers,
});

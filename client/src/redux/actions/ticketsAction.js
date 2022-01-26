import * as api from "../../API";

export const getAllTicket = (projectid) => async (dispatch) => {
	dispatch({ type: "GET_ALL_TICKET" });
	try {
		const { data } = await api.getTickets(projectid);
		dispatch({ type: "GET_ALL_TICKET_SUCCESS", payload: data });
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export const createTicket = (projectid, formData) => async (dispatch) => {
	dispatch({ type: "CREATE_TICKET" });

	try {
		const { data } = await api.createTicket(projectid, formData);

		dispatch({ type: "CREATE_TICKET_SUCCESS", payload: data.result });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_TICKET_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export const getAllMyTickets = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_MY_TICKET" });
	try {
		const { data } = await api.getMyTickets();
		dispatch({ type: "GET_ALL_MY_TICKET_SUCCESS", payload: data });
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export const updateMyTicket = (ticketId, formData) => async (dispatch) => {
	dispatch({ type: "UPDATE_MY_TICKET" });
	try {
		const { data } = await api.updateMyTickets(ticketId, formData);
		dispatch({ type: "UPDATE_MY_TICKET_SUCCESS", payload: data });
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export const updatableTicketReducers = (
	state = { data: null, success: null, loading: true },
	action
) => {
	switch (action.type) {
		case "GET_ALL_MY_TICKET":
			return state;
		case "GET_ALL_MY_TICKET_SUCCESS":
			return { ...state, data: action.payload, success: true, loading: false };
		case "GET_ALL_MY_TICKET_ERROR":
			return { ...state, data: action.payload, success: false, loading: false };
		case "UPDATE_MY_TICKET":
			return { ...state, loading: true };
		case "UPDATE_MY_TICKET_SUCCESS":
			let existingData = state.data.filter(
				(ticket) => ticket._id !== action.payload._id
			);
			let updatedData = [...existingData, action.payload];
			return { ...state, data: updatedData, success: true, loading: false };
		case "CLEAR_UPDATE_MY_TICKET_SUCCESS":
			return { ...state, success: null };
		case "CREATE_UPDATE_MY_TICKET_ERROR":
			return { ...state, data: action.payload, success: false, loading: false };

		default:
			return state;
	}
};

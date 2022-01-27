export const ticketReducers = (
	state = { data: null, success: null, loading: true },
	action
) => {
	switch (action.type) {
		case "GET_ALL_TICKET":
			return { ...state, success: null, loading: true };
		case "GET_ALL_TICKET_SUCCESS":
			return { ...state, data: action.payload, loading: false };
		case "GET_ALL_TICKET_ERROR":
			return { ...state, data: null, loading: false };
		case "CREATE_TICKET":
			return { ...state, loading: true };
		case "CREATE_TICKET_SUCCESS":
			let currentData = [...state.data, action.payload];
			return { ...state, data: currentData, success: true, loading: false };
		case "CREATE_TICKET_ERROR":
			return { ...state, success: false, loading: false };
		case "CLEAR_TICKET_SUCCESS":
			return { ...state, success: null };

		default:
			return state;
	}
};

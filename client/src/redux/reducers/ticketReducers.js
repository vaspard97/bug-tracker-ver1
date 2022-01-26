export const ticketReducers = (
	state = { data: null, success: null, loading: true },
	action
) => {
	switch (action.type) {
		case "GET_ALL_TICKET":
			return state;
		case "GET_ALL_TICKET_SUCCESS":
			return { ...state, data: action.payload, success: null, loading: false };
		case "GET_ALL_TICKET_ERROR":
			return { ...state, data: action.payload, success: null, loading: false };
		case "CREATE_TICKET":
			return { ...state, loading: true };
		case "CREATE_TICKET_SUCCESS":
			let currentData = [...state.data, action.payload];

			return { ...state, data: currentData, success: true, loading: false };
		case "CLEAR_TICKET_SUCCESS":
			return { ...state, success: null };
		case "CREATE_TICKET_ERROR":
			return { ...state, data: action.payload, success: false, loading: false };

		default:
			return state;
	}
};

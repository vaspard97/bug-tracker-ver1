export const getAllUserReducer = (
	state = { data: null, success: false, loading: true },
	action
) => {
	switch (action.type) {
		case "GET_ALL_USER":
			return state;
		case "GET_ALL_USER_SUCCESS":
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
			};
		case "GET_ALL_USER_ERROR":
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
			};

		default:
			return state;
	}
};

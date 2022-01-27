export const verificationReducer = (
	state = { data: null, success: null, loading: true },
	action
) => {
	switch (action.type) {
		case "VERIFY_USER":
			return state;
		case "VERIFY_USER_SUCCESS":
			return {
				...state,
				data: action.payload.message,
				success: true,
				loading: false,
			};

		case "VERIFY_USER_ERROR":
			return {
				...state,
				data: action.payload.message,
				success: false,
				loading: false,
			};
		default:
			return state;
	}
};

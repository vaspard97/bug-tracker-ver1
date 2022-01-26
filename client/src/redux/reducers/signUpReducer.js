export const signUpReducers = (
	state = { data: null, success: false, loading: false },
	action
) => {
	switch (action.type) {
		case "SIGNUP":
			return {
				...state,
				data: null,
				success: false,
				loading: true,
			};
		case "SIGNUP_SUCCESS":
			return {
				...state,
				data: "Sign Up Successful!!",
				success: true,
				loading: false,
			};
		case "SIGNUP_ERROR":
			return {
				...state,
				data: action.payload,
				success: false,
				loading: false,
			};
		case "CLEAR_SIGNUP_ERROR":
			return action.payload;
		default:
			return state;
	}
};

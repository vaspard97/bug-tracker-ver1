export const userReducers = (
	state = { data: null, success: false, loading: true },
	action
) => {
	switch (action.type) {
		case "FETCH_USER":
			return {
				...state,
				data: null,
				success: false,
				loading: true,
			};

		case "FETCH_USER_SUCCESS":
			return {
				...state,
				data: action.payload.user,
				success: true,
				loading: false,
			};
		case "FETCH_USER_ERROR":
			return {
				...state,
				data: null,
				success: false,
				loading: false,
			};
		case "SIGNIN":
			return {
				...state,
				data: null,
				success: false,
				loading: true,
			};

		case "SIGNIN_SUCCESS":
			return {
				...state,
				data: action.payload.user,
				success: true,
				loading: false,
			};

		case "SIGNIN_ERROR":
			return {
				...state,
				data: action.payload,
				success: false,
				loading: false,
			};

		case "CLEAR_SIGNIN_ERROR":
			return {
				...state,
				data: null,
				success: false,
				loading: false,
			};

		case "SIGNOUT":
			return {
				...state,
				success: false,
				loading: true,
			};

		case "SIGNOUT_SUCCESS":
			return {
				...state,
				data: null,
				success: false,
				loading: false,
			};

		default:
			return state;
	}
};

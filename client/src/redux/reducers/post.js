export const postReducer = (
	state = { data: null, success: false, loading: true },
	action
) => {
	switch (action.type) {
		case "CREATE_PROJECTS":
			return {
				...state,
				data: null,
				success: false,
				loading: true,
			};
		case "CREATE_PROJECTS_SUCCESS":
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
			};
		case "CREATE_PROJECTS_ERROR":
			return {
				...state,
				data: action.payload,
				success: false,
				loading: false,
			};

		case "CLEAR_CREATE_PROJECTS":
			return {
				...state,
				data: null,
				success: false,
				loading: false,
			};
		case "UPDATE_PROJECT":
			return {
				...state,
				data: null,
				success: true,
				loading: true,
			};
		case "UPDATE_PROJECT_SUCCESS":
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
			};
		case "UPDATE_PROJECT_ERROR":
			return {
				...state,
				data: action.payload,
				success: false,
				loading: false,
			};
		case "CLEAR_UPDATE_PROJECT":
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

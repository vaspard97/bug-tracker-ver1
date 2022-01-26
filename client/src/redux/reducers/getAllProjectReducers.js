export const getAllProjectsReducers = (
	state = { data: null, success: false, loading: true },
	action
) => {
	switch (action.type) {
		case "GET_PROJECTS":
			return {
				...state,
				data: null,
				success: true,
				loading: true,
			};
		case "GET_PROJECTS_SUCCESS":
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
			};
		case "GET_PROJECTS_ERROR":
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

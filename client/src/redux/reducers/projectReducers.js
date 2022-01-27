export const projectReducers = (
	state = { data: null, success: null, loading: true },
	action
) => {
	switch (action.type) {
		case "GET_ALL_PROJECTS":
			return { ...state, success: null, loading: true };
		case "GET_ALL_PROJECTS_SUCCESS":
			return { ...state, data: action.payload, loading: false };
		case "GET_ALL_PROJECTS_ERROR":
			return { ...state, data: null, loading: false };
		case "CREATE_PROJECT":
			return { ...state, success: null, loading: true };
		case "CREATE_PROJECT_SUCCESS":
			let currentData = [...state.data, action.payload];
			return { ...state, data: currentData, success: true, loading: false };
		case "CREATE_PROJECTS_ERROR":
			return { ...state, success: false, loading: false };
		case "UPDATE_PROJECT":
			return { ...state, success: null, loading: true };
		case "UPDATE_PROJECT_SUCCESS":
			let existingData = state.data.filter(
				(project) => project._id !== action.payload._id
			);
			let updatedData = [...existingData, action.payload];
			return { ...state, data: updatedData, success: true, loading: false };
		case "UPDATE_PROJECTS_ERROR":
			return { ...state, success: false, loading: false };
		case "CLEAR_PROJECT_SUCCESS":
			return { ...state, success: null };

		default:
			return state;
	}
};

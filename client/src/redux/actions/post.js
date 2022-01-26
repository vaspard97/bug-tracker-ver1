import * as api from "../../API";

export const createProjects = (formData) => async (dispatch) => {
	dispatch({ type: "CREATE_PROJECTS" });
	try {
		const { data } = await api.createProjects(formData);
		dispatch({ type: "CREATE_PROJECTS_SUCCESS", payload: data });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_CREATE_PROJECTS",
			});
		}, 3000);
	} catch (error) {
		dispatch({
			type: "CREATE_PROJECTS_ERROR",
			payload: error.response.data.message,
		});
		setTimeout(() => {
			dispatch({
				type: "CLEAR_CREATE_PROJECTS",
			});
		}, 3000);
	}
};

export const updateProject = (id, formData) => async (dispatch) => {
	dispatch({ type: "UPDATE_ONE_PROJECT" });
	try {
		await api.updateProject(id, formData);
	} catch (error) {
		console.log(error);
	}
};

import * as api from "../../API";

export const getProjects = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_PROJECTS" });
	try {
		const { data } = await api.getProjects();
		dispatch({ type: "GET_ALL_PROJECTS_SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "GET_ALL_PROJECTS_ERROR" });
	}
};

export const createProject = (formData) => async (dispatch) => {
	dispatch({ type: "CREATE_PROJECTS" });
	try {
		const { data } = await api.createProjects(formData);
		dispatch({ type: "CREATE_PROJECT_SUCCESS", payload: data });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		dispatch({
			type: "CREATE_PROJECT_ERROR",
		});
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	}
};

export const updateProject = (id, formData) => async (dispatch) => {
	dispatch({ type: "UPDATE_PROJECT" });
	try {
		const { data } = await api.updateProject(id, formData);
		dispatch({ type: "UPDATE_PROJECT_SUCCESS", payload: data });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	} catch (error) {
		console.log(error);
		setTimeout(() => {
			dispatch({
				type: "CLEAR_PROJECT_SUCCESS",
			});
		}, 3000);
	}
};

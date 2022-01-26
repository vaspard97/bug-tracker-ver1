import * as api from "../../API";

export const getProjects = () => async (dispatch) => {
	dispatch({ type: "GET_PROJECTS" });
	try {
		const { data } = await api.getProjects();

		dispatch({ type: "GET_PROJECTS_SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "GET_PROJECTS_ERROR", payload: error.response.message });
	}
};

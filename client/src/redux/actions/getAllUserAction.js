import * as api from "../../API";

export const getAllUser = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_USER" });

	try {
		const { data } = await api.getAllUser();
		dispatch({ type: "GET_ALL_USER_SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "GET_ALL_USER_ERROR", payload: error.data });
	}
};

export const resetGetAllUser = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_USER" });
};

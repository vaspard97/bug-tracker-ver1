import * as api from "../../API";
export const userAuthentication = (verificationData) => async (dispatch) => {
	dispatch({ type: "VERIFY_USER" });
	try {
		const { data } = await api.verifyUser(verificationData);
		dispatch({ type: "VERIFY_USER_SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "VERIFY_USER_ERROR", payload: error.response.data });
	}
};

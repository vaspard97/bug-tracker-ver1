import { useSelector } from "react-redux";
import SignIn from "../form/signin";
import { Box } from "@mui/material";
import LoadingPage from "./LoadingPage";
import { Navigate } from "react-router-dom";
export default function SignInPage() {
	const selector = useSelector((state) => state.userReducers);

	return (
		<>
			{selector.data && selector.success && <Navigate to="/" />}

			{selector.loading ? (
				<LoadingPage></LoadingPage>
			) : (
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<SignIn />
				</Box>
			)}
		</>
	);
}

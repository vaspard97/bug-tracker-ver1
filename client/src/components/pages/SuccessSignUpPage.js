import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { Container, Typography, Button, Box, Paper } from "@mui/material";

export default function SuccessSignUpPage() {
	const selector = useSelector((state) => state.signUpReducers);
	const cleanUpSelector = () => {
		selector.data = null;
		selector.success = false;
		selector.loading = false;
	};
	useEffect(() => {
		// eslint-disable-next-line
	}, []);
	return (
		<>
			{!selector.data && <Navigate to="/signup" />}
			<Container maxWidth="sm">
				<Paper variant="outlined">
					<Box padding={5}>
						{selector.success ? (
							<>
								<Typography textAlign="center" variant="h4" color="green">
									Success!!
								</Typography>
								<Typography
									textAlign="center"
									variant="subtitle1"
									marginTop={6}
								>
									Congratulation! you have successfully Sign Up.
								</Typography>
								<Typography
									textAlign="center"
									variant="subtitle1"
									marginBottom={6}
								>
									Please Check Your Email for Verification.
								</Typography>
								<Button
									variant="contained"
									fullWidth
									component={Link}
									to="/"
									onClick={cleanUpSelector}
								>
									Return Home
								</Button>
							</>
						) : (
							<h1>Failed</h1>
						)}
					</Box>
				</Paper>
			</Container>
			;
		</>
	);
}

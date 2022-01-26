import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAuthentication } from "../../redux/actions/auth";
import { useSearchParams, Link } from "react-router-dom";

import { Container, Typography, Button, Box, Paper } from "@mui/material";

function VerifyPage() {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state.authReducer);
	const [searchParams] = useSearchParams();
	let email = searchParams.get("email");
	let verificationToken = searchParams.get("token");

	const cleanUpSelector = () => {
		selector.data = null;
		selector.success = false;
	};
	useEffect(() => {
		const verificationData = { email, verificationToken };
		dispatch(userAuthentication(verificationData));
		// eslint-disable-next-line
	}, []);
	if (!selector.success)
		return (
			<Container maxWidth="sm">
				<Paper variant="outlined">
					<Box padding={5}>
						<Typography textAlign="center" variant="h4" color="red">
							{selector.data}
						</Typography>
						<Typography textAlign="center" variant="subtitle1" marginTop={5}>
							Opppss! There was an error during your verification.
						</Typography>
						<Typography textAlign="center" variant="subtitle1" marginBottom={5}>
							Please try again later or contact the us at.
						</Typography>
						<Typography textAlign="center" variant="h6" marginBottom={6}>
							hasif.ifwat.ramlan@gmail.com.
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
					</Box>
				</Paper>
			</Container>
		);
	if (selector.success)
		return (
			<Container maxWidth="sm">
				<Paper variant="outlined">
					<Box padding={5}>
						<>
							<Typography textAlign="center" variant="h4" color="green">
								{selector.data}
							</Typography>
							<Typography textAlign="center" variant="subtitle1" marginTop={6}>
								Congratulation! you have successfully verified your email.
							</Typography>
							<Typography
								textAlign="center"
								variant="subtitle1"
								marginBottom={6}
							>
								You can now log in by clicking the button below.
							</Typography>
							<Button
								variant="contained"
								fullWidth
								component={Link}
								to="/"
								onClick={cleanUpSelector}
							>
								Log Me In
							</Button>
						</>
					</Box>
				</Paper>
			</Container>
		);
}

export default VerifyPage;

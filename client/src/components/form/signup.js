import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	Container,
	InputAdornment,
	IconButton,
	CircularProgress,
	Snackbar,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signUp } from "../../redux/actions/user";
import FormAlert from "./formAlert";

let initialState = {
	email: "",
	password: "",
	confirmPassword: "",
	firstName: "",
	lastName: "",
};
function SignUp() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const selector = useSelector((state) => state.signUpReducers);
	const [formData, setFormData] = useState(initialState);

	const [isPasswordMatch, setIsPasswordMatch] = useState(true);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.confirmPassword !== formData.password) {
			setIsPasswordMatch(false);
			setTimeout(() => {
				setIsPasswordMatch(true);
			}, 5000);
		}
		if (formData.confirmPassword === formData.password) {
			dispatch(signUp(formData, navigate));
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleShowPassword = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const cleanUpSelector = () => {
		selector.data = null;
		selector.success = false;
	};

	return (
		<Container component="main" maxWidth={"xs"}>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="h5">Sign Up</Typography>
				<Box component="form" onSubmit={handleSubmit} marginTop={1}>
					<Grid container spacing={1}>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								required
								label="Fist Name"
								name="firstName"
								margin="normal"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								required
								label="Last Name"
								name="lastName"
								margin="normal"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<TextField
						fullWidth
						required
						label="Email"
						name="email"
						margin="normal"
						autoComplete="current-email"
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						required
						label="Password"
						name="password"
						type={isPasswordVisible ? "text" : "password"}
						margin="normal"
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleShowPassword}>
										{isPasswordVisible ? (
											<VisibilityOffIcon />
										) : (
											<VisibilityIcon />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						onChange={handleChange}
					/>

					<TextField
						fullWidth
						required
						label="Confirm Password"
						name="confirmPassword"
						type="password"
						margin="normal"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<Button
						disabled={selector.loading}
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						{selector.loading ? <CircularProgress /> : <> Sign Up</>}
					</Button>
				</Box>
			</Box>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="flex-end"
				marginTop={2}
			>
				<Typography
					variant="body2"
					component={Link}
					to="/signin"
					onClick={cleanUpSelector}
				>
					Already Have and account? Sign In
				</Typography>
			</Box>
			<Snackbar open={selector.data && !selector.success}>
				<FormAlert props={{ message: selector.data }} />
			</Snackbar>
			<Snackbar open={!isPasswordMatch}>
				<FormAlert props={{ message: "Password Did Not Match" }} />
			</Snackbar>
		</Container>
	);
}

export default SignUp;

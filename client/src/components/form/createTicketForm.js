import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Button,
	TextField,
	Card,
	Box,
	Typography,
	Container,
	Grid,
	Snackbar,
	FormLabel,
} from "@mui/material";

import { getAllUser } from "../../redux/actions/getAllUserAction";
import { createTicket } from "../../redux/actions/ticketsAction";
import UserSelectTicket from "./userSelectTicket";
import PrioritySelectTicket from "./prioritySelectTicket";
import ProgressSelectTicket from "./progressSelectTicket";
import FormAlert from "./formAlert";

let initialState = {
	title: "",
	description: "",
	priority: { label: "MED", value: "medium" },
	status: { label: "OPEN", value: "open" },
	issuedBy: "",
	developers: [],
};

function CreateTicket({ props }) {
	const {
		showProjectForm,
		setSelectedProjectId,
		selectedProjectId,
		selectedProject,
	} = props;
	const [formData, setFormData] = useState(initialState);
	const [formError, setFormError] = useState(false);

	const dispatch = useDispatch();
	const projectSelector = useSelector((state) =>
		state.getAllProjectsReducers?.data?.find(
			(item) => item._id === selectedProjectId
		)
	);
	const allUsers = useSelector((state) => state.getAllUserReducer);
	const handleFormError = () => {
		setFormError(!formError);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			formData.title === "" ||
			formData.description === "" ||
			formData.developers.length === 0
		) {
			handleFormError();
			return;
		}

		dispatch(createTicket(selectedProject._id, formData));

		showProjectForm();
	};

	const handleCancel = () => {
		setFormData(initialState);
		setSelectedProjectId(null);
		showProjectForm();
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		dispatch(getAllUser());
		// eslint-disable-next-line
	}, []);

	return (
		<Container component="main" maxWidth={"md"}>
			<Card variant="outlined">
				<Box
					sx={{
						margin: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						maxWidth: "100%",
					}}
				>
					<Typography variant="h5">Create New Ticket</Typography>

					<Box
						component="form"
						onSubmit={handleSubmit}
						marginTop={1}
						width={"100%"}
					>
						<TextField
							fullWidth
							required
							label="Title"
							name="title"
							margin="normal"
							onChange={handleChange}
							value={formData.title}
						/>
						<TextField
							fullWidth
							required
							label="Descripton"
							name="description"
							margin="normal"
							onChange={handleChange}
							multiline
							rows={4}
							value={formData.description}
						/>
						<Box marginTop={1}>
							<FormLabel>Developers</FormLabel>
							{allUsers.loading ? (
								<Typography>Loading</Typography>
							) : (
								<UserSelectTicket
									props={{
										allUsers,
										setFormData,
										formData,
										projectSelector,
										selectedProject,
									}}
								/>
							)}
						</Box>
						<Grid marginTop={1} container spacing={2}>
							<Grid item xs={6}>
								<PrioritySelectTicket
									props={{
										setFormData,
										formData,
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<ProgressSelectTicket
									props={{
										setFormData,
										formData,
									}}
								/>
							</Grid>
						</Grid>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={allUsers.loading}
						>
							Create Ticket
						</Button>
						<Button
							fullWidth
							variant="contained"
							color="inherit"
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</Box>
					<Snackbar
						open={formError}
						autoHideDuration={3000}
						onClose={handleFormError}
					>
						<FormAlert
							props={{
								severity: "warning",
								message: "Please Fill In All Fields",
							}}
						/>
					</Snackbar>
				</Box>
			</Card>
		</Container>
	);
}

export default CreateTicket;

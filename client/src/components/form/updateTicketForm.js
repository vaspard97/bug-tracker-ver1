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
} from "@mui/material";

import { getAllUser } from "../../redux/actions/getAllUserAction";
import { updateMyTicket } from "../../redux/actions/ticketsAction";
import UserSelectTicket from "./userSelectTicket";
import PrioritySelectTicket from "./prioritySelectTicket";
import ProgressSelectTicket from "./progressSelectTicket";
import FormAlert from "./formAlert";

let initialState = {
	title: "",
	description: "",
	priority: "",
	status: "",
	issuedBy: "",
	developers: [],
};

export default function UpdateTicketForm({ props }) {
	const {
		showTicketForm,
		setSelectedTicketId,
		selectedTicketId,
		setSelectedProjectId,
		selectedProjectId,
		setSelectedProject,
		selectedProject,
		setSelectedMyTicket,
		selectedMyTicket,
	} = props;
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialState);
	const [formError, setFormError] = useState(false);
	const [defaultPriorityValue, setDefaultPriorityValue] = useState({
		label: "MID",
		value: "medium",
	});
	const [defaultStatusValue, setDefaultStatusValue] = useState({
		label: "OPEN",
		value: "open",
	});
	const [defaultDevelopersValue, setDefaultDevelopersValue] = useState([]);

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

		dispatch(updateMyTicket(selectedTicketId, formData));
		setFormData(initialState);
		setSelectedProjectId(null);
		setSelectedTicketId(null);
		setSelectedProject(null);
		setSelectedMyTicket(null);
		showTicketForm();
	};

	const handleCancel = () => {
		setFormData(initialState);
		setSelectedProjectId(null);
		setSelectedTicketId(null);
		setSelectedProject(null);
		setSelectedMyTicket(null);
		showTicketForm();
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

	useEffect(() => {
		if (selectedTicketId) {
			setFormData({
				...formData,
				title: selectedMyTicket.title,
				description: selectedMyTicket.description,
				priority: defaultPriorityValue,
				status: defaultStatusValue,
				developers: defaultDevelopersValue,
				issuedBy: selectedMyTicket.issuedBy._id,
			});
		}
		// eslint-disable-next-line
	}, [defaultPriorityValue]);

	return (
		<Container component="main" maxWidth={"md"}>
			<Card variant="outlined">
				<Box
					margin={4}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						maxWidth: "100%",
					}}
				>
					<Typography variant="h5">Update Selected Ticket</Typography>

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
							{allUsers.loading ? (
								<Typography>Loading..</Typography>
							) : (
								<UserSelectTicket
									props={{
										allUsers,
										setFormData,
										formData,
										projectSelector,
										selectedProject,
										selectedTicketId,
										defaultDevelopersValue,
										setDefaultDevelopersValue,
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
										selectedMyTicket,
										selectedTicketId,
										setDefaultPriorityValue,
										defaultPriorityValue,
									}}
								/>
							</Grid>
							<Grid item xs={6}>
								<ProgressSelectTicket
									props={{
										setFormData,
										formData,
										selectedMyTicket,
										selectedTicketId,
										defaultStatusValue,
										setDefaultStatusValue,
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
							Update Ticket
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

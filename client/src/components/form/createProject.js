import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Button,
	TextField,
	Card,
	Box,
	Typography,
	Container,
	Snackbar,
	Alert,
} from "@mui/material";

import { getAllUser } from "../../redux/actions/getAllUserAction";
import {
	createProject,
	updateProject,
} from "../../redux/actions/projectAction";
import UserSelect from "./userSelect";
import FormAlert from "./formAlert";

let initialState = {
	title: "",
	description: "",
	developers: [],
};

function CreateProject({ props }) {
	const { showProjectForm, setSelectedId, selectedId } = props;
	const [formData, setFormData] = useState(initialState);
	const [formError, setFormError] = useState(false);

	const dispatch = useDispatch();

	const projectSelector = useSelector((state) =>
		state.projectReducers?.data?.find((item) => item._id === selectedId)
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
		if (!selectedId) {
			dispatch(createProject(formData));
		}

		if (selectedId) {
			dispatch(updateProject(selectedId, formData));
		}
		setFormData(initialState);
		setSelectedId(null);
		showProjectForm();
	};

	const handleCancel = () => {
		setFormData(initialState);
		setSelectedId(null);
		showProjectForm();
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		dispatch(getAllUser());
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (selectedId) {
			setFormData({
				...formData,
				title: projectSelector.title,
				description: projectSelector.description,
				developers: projectSelector.developers,
			});
		}
		// eslint-disable-next-line
	}, [getAllUser.loading === false]);
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
					<Typography variant="h5">
						{selectedId ? <>Update Project</> : <>Create Project</>}
					</Typography>

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
						<Box marginTop={2}>
							{allUsers.loading ? (
								<Alert severity="info">Fetching User Data</Alert>
							) : (
								<UserSelect
									props={{
										allUsers,
										setFormData,
										formData,
										projectSelector,
										selectedId,
									}}
								/>
							)}
						</Box>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={allUsers.loading}
						>
							{selectedId ? <>Update Project</> : <>Create Project</>}
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

export default CreateProject;

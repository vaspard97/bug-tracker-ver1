import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Button,
	TextField,
	Card,
	Box,
	Typography,
	Container,
} from "@mui/material";

import { getAllUser } from "../../redux/actions/getAllUserAction";
import { getProjects } from "../../redux/actions/getAllProjectsAction";
import { createProjects, updateProject } from "../../redux/actions/post";
import UserSelect from "./userSelect";

let initialState = {
	title: "",
	description: "",
	developers: [],
};

function CreateProject({ props }) {
	const { showProjectForm, setSelectedId, selectedId } = props;
	const dispatch = useDispatch();

	const projectSelector = useSelector((state) =>
		state.getAllProjectsReducers?.data?.find((item) => item._id === selectedId)
	);

	const allUsers = useSelector((state) => state.getAllUserReducer);
	const [formData, setFormData] = useState(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectedId) {
			dispatch(createProjects(formData));
		}

		if (selectedId) {
			dispatch(updateProject(selectedId, formData));
		}
		dispatch(getProjects());
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
		if (projectSelector && selectedId) {
			setFormData({
				...formData,
				title: projectSelector.title,
				description: projectSelector.description,
			});
		}
		// eslint-disable-next-line
	}, [selectedId !== null]);
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
					<Typography variant="h5">Create New Project</Typography>

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
								<Typography>Loading..</Typography>
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
				</Box>
			</Card>
		</Container>
	);
}

export default CreateProject;

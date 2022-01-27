import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getProjects } from "../../redux/actions/getAllProjectsAction";
import { getProjects } from "../../redux/actions/projectAction";
import {
	Typography,
	Button,
	Box,
	Modal,
	Divider,
	CircularProgress,
	Slide,
} from "@mui/material";
import ProjectCard from "./projectCard";
import CreateProject from "../form/createProject";
import NoProjectFound from "./noProjectFound";
export default function DataTable() {
	const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const dispatch = useDispatch();
	const projectsSelector = useSelector((state) => state.projectReducers);
	const userSelector = useSelector((state) => state.userReducers);
	const showProjectForm = () => {
		setIsProjectFormVisible(!isProjectFormVisible);
	};

	useEffect(() => {
		if (userSelector.data !== null) {
			dispatch(getProjects());
		}

		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Modal open={isProjectFormVisible}>
				<Slide in={isProjectFormVisible} direction={"down"}>
					<Box
						height={"100%"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<CreateProject
							props={{ showProjectForm, setSelectedId, selectedId }}
						/>
					</Box>
				</Slide>
			</Modal>

			<Box marginTop={2} marginBottom={2}>
				<Typography variant="h5" gutterBottom>
					Dashboard
				</Typography>
				<Typography>
					View and Update all the Projects that had been assigned to you or
					created by you.
				</Typography>
			</Box>

			<Divider />

			<Box marginTop={1.5} marginBottom={1.5}>
				<Button
					variant="contained"
					onClick={showProjectForm}
					size={"small"}
					disabled={projectsSelector?.loading}
				>
					Create Project
				</Button>
			</Box>

			{projectsSelector?.loading ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height={"50vh"}
				>
					<CircularProgress />
				</Box>
			) : projectsSelector?.data === undefined || null ? (
				<Typography variant="h5">Opppss! seem like there was error</Typography>
			) : projectsSelector?.data?.length === 0 ? (
				<NoProjectFound />
			) : (
				projectsSelector.data.map((item) => {
					const {
						tickets,
						updatedAt,
						createdAt,
						createdBy,
						description,
						title,
						developers,
						_id,
					} = item;
					return (
						<ProjectCard
							key={_id}
							props={{
								tickets,
								updatedAt,
								createdAt,
								createdBy,
								description,
								title,
								developers,
								_id,
								setIsProjectFormVisible,
								setSelectedId,
							}}
						/>
					);
				})
			)}
		</>
	);
}

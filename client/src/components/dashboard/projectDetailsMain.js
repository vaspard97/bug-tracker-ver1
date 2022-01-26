import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
	Typography,
	Button,
	Box,
	Modal,
	Slide,
	CircularProgress,
	Divider,
} from "@mui/material";
import { getAllTicket } from "../../redux/actions/ticketsAction";
import ProjectDetailsCard from "./projectDetailsCard";
import CreateTicket from "../form/createTicketForm";
import TicketCard from "./ticketsCard";

export default function ProjectDetails() {
	const [isProjectFormVisible, setIsProjectFormVisible] = useState(false);
	const [selectedProjectId, setSelectedProjectId] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null);
	const [numOfTicket, setNumOfTicket] = useState(0);

	const dispatch = useDispatch();
	const location = useLocation();
	const projectsSelector = useSelector((state) => state.getAllProjectsReducers);
	const ticketsSelector = useSelector((state) => state.ticketReducers);

	let currentId = location.pathname.slice(1);
	const showProjectForm = () => {
		setIsProjectFormVisible(!isProjectFormVisible);
	};

	useEffect(() => {
		setSelectedProject(
			projectsSelector?.data?.find((project) => project._id === currentId)
		);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (selectedProject) {
			dispatch(getAllTicket(selectedProject._id));
		}

		// eslint-disable-next-line
	}, [selectedProject !== null]);

	useEffect(() => {
		if (ticketsSelector.data) {
			setNumOfTicket(ticketsSelector.data.length);
		}
		// eslint-disable-next-line
	}, [ticketsSelector.data !== null]);
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
						<CreateTicket
							props={{
								showProjectForm,
								setSelectedProjectId,
								selectedProjectId,
								selectedProject,
							}}
						/>
					</Box>
				</Slide>
			</Modal>

			<Box marginTop={2} marginBottom={2}>
				<Box display="flex" marginBottom={2}>
					<Box flexGrow={1}>
						<Typography variant="h5">Project Details</Typography>
					</Box>
				</Box>
				<Typography>
					Create and assigned tickets to deveoper within te project team.
				</Typography>
			</Box>

			<Divider />
			<Box marginTop={1.5} marginBottom={1.5}>
				<Button
					variant="contained"
					onClick={showProjectForm}
					disabled={ticketsSelector.loading}
				>
					Create Tickets
				</Button>
			</Box>

			{projectsSelector.loading ? (
				<Typography>Loading...</Typography>
			) : selectedProject ? (
				<>
					<ProjectDetailsCard props={{ selectedProject, numOfTicket }} />
					<Typography marginTop={2} marginBottom={2} variant="h6">
						Project Tickets
					</Typography>

					{ticketsSelector.loading ? (
						<Box display="flex" justifyContent="center" alignItems="center">
							<CircularProgress />
						</Box>
					) : ticketsSelector.data.length === 0 || undefined || null ? (
						<>
							<Typography variant="h5" textAlign={"center"}>
								There Is No Ticket For the Project
							</Typography>
						</>
					) : (
						ticketsSelector?.data?.map((item) => {
							return (
								<TicketCard
									key={item._id}
									props={{ selectedProject, ticketsSelector, item }}
								/>
							);
						})
					)}
				</>
			) : (
				<Typography>Project Not Found</Typography>
			)}
		</>
	);
}

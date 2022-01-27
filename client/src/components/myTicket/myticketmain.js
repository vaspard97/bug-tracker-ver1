import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Typography,
	Box,
	Modal,
	CircularProgress,
	Divider,
	Slide,
} from "@mui/material";
import { getAllMyTickets } from "../../redux/actions/ticketsAction";
import MyTicketCard from "./myTicketCard";
import UpdateTicketForm from "../form/updateTicketForm";
import NoTicketFound from "./noTicketFound";
export default function MyTicketMain() {
	const [isTicketFormVisible, setIsTicketFormVisible] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [selectedMyTicket, setSelectedMyTicket] = useState(null);
	const [selectedProjectId, setSelectedProjectId] = useState(null);
	const [selectedTicketId, setSelectedTicketId] = useState(null);

	const dispatch = useDispatch();
	const projectsSelector = useSelector((state) => state.projectReducers);
	const myTicketsSelector = useSelector(
		(state) => state.updatableTicketReducers
	);

	const showTicketForm = () => setIsTicketFormVisible(!isTicketFormVisible);

	useEffect(() => {
		if (selectedProjectId) {
			setSelectedProject(
				projectsSelector?.data?.find(
					(project) => project._id === selectedProjectId
				)
			);
		}
		// eslint-disable-next-line
	}, [selectedProjectId !== null]);

	useEffect(() => {
		if (selectedTicketId) {
			setSelectedMyTicket(
				myTicketsSelector?.data?.find(
					(ticket) => ticket._id === selectedTicketId
				)
			);
		}
		// eslint-disable-next-line
	}, [selectedTicketId !== null]);

	useEffect(() => {
		dispatch(getAllMyTickets());
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<Modal open={isTicketFormVisible}>
				<Slide in={isTicketFormVisible} direction={"down"}>
					<Box
						height={"100%"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<UpdateTicketForm
							props={{
								showTicketForm,
								setSelectedTicketId,
								selectedTicketId,
								setSelectedProjectId,
								selectedProjectId,
								setSelectedProject,
								selectedProject,
								setSelectedMyTicket,
								selectedMyTicket,
							}}
						/>
					</Box>
				</Slide>
			</Modal>

			<Box marginTop={2} marginBottom={2}>
				<Typography variant="h5" gutterBottom>
					My Tickets
				</Typography>
				<Typography>
					View and Update all the tickets that had been assigned to you or
					created by you.
				</Typography>
			</Box>

			<Divider />
			<Box marginTop={1.5} marginBottom={1.5}></Box>
			<Box>
				{myTicketsSelector.loading ? (
					<Box
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
						height={"50vh"}
					>
						<CircularProgress />
					</Box>
				) : myTicketsSelector?.data?.length < 1 ? (
					<NoTicketFound />
				) : (
					myTicketsSelector.data.map((item) => {
						return (
							<MyTicketCard
								props={{
									item,
									showTicketForm,
									setSelectedTicketId,
									selectedTicketId,
									setSelectedProjectId,
									setSelectedProject,
								}}
								key={item._id}
							/>
						);
					})
				)}
			</Box>
		</>
	);
}

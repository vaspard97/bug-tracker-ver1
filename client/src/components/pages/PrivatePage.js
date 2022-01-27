import { useState } from "react";
import Sidebar from "../navbar/sidebar";
import { Box, Container, Snackbar } from "@mui/material";
import FormAlert from "../form/formAlert";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingPage from "./LoadingPage";
import TopNavBar from "../navbar/topNavBar";

export default function PrivatePage() {
	const [isSidebaropen, setIsSidebarOpen] = useState(false);
	const userSelector = useSelector((state) => state.userReducers);
	const myTicketsSelector = useSelector(
		(state) => state.updatableTicketReducers
	);
	const ticketSelector = useSelector((state) => state.ticketReducers);
	const projectSelector = useSelector((state) => state.projectReducers);
	const handleSidebar = () => {
		setIsSidebarOpen(!isSidebaropen);
	};

	return (
		<>
			{!userSelector.data && !userSelector.success && <Navigate to="/signin" />}

			<>
				<TopNavBar props={{ handleSidebar }} />
				<Box marginTop={12}>
					<Container maxWidth="lg">
						{userSelector.loading ? <LoadingPage /> : <Outlet />}
					</Container>
				</Box>
				<Sidebar props={{ isSidebaropen, handleSidebar }} />

				<Snackbar
					open={projectSelector.success === true}
					autoHideDuration={3000}
				>
					<FormAlert
						props={{ severity: "success", message: "Project Form Submitted" }}
					/>
				</Snackbar>
				<Snackbar open={projectSelector.success === false}>
					<FormAlert
						props={{
							severity: "error",
							message: "Oppss! Something Went Wrong",
						}}
					/>
				</Snackbar>
				<Snackbar
					open={ticketSelector.success === true}
					autoHideDuration={3000}
				>
					<FormAlert
						props={{ severity: "success", message: "Ticket Created!" }}
					/>
				</Snackbar>
				<Snackbar
					open={ticketSelector.success === false}
					autoHideDuration={3000}
				>
					<FormAlert
						props={{
							severity: "error",
							message: "Oppss! Something Went Wrong",
						}}
					/>
				</Snackbar>
				<Snackbar
					open={myTicketsSelector.success === true}
					autoHideDuration={3000}
				>
					<FormAlert
						props={{
							severity: "success",
							message: "Ticket Form Submitted Successfully",
						}}
					/>
				</Snackbar>
				<Snackbar open={myTicketsSelector.success === false}>
					<FormAlert
						props={{
							severity: "error",
							message: "Oppss! Something Went Wrong",
						}}
					/>
				</Snackbar>
			</>
		</>
	);
}

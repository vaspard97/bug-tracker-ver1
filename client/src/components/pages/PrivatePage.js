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
	const postSelector = useSelector((state) => state.postReducer);
	const ticketSelector = useSelector((state) => state.ticketReducers);

	const handleSidebar = () => {
		setIsSidebarOpen(!isSidebaropen);
	};
	return (
		<>
			{userSelector.loading && <LoadingPage />}
			{!userSelector.data && !userSelector.success && <Navigate to="/signin" />}

			<>
				<TopNavBar props={{ handleSidebar }} />
				<Box marginTop={12}>
					<Container maxWidth="lg">
						<Outlet />
					</Container>
				</Box>
				<Sidebar props={{ isSidebaropen, handleSidebar }} />
				<Snackbar open={!postSelector.success && !!postSelector.data}>
					<FormAlert props={{ message: postSelector.data }} />
				</Snackbar>
				<Snackbar open={postSelector.success && !!postSelector.data}>
					<FormAlert
						props={{ severity: "success", message: "Success Form Submission" }}
					/>
				</Snackbar>
				<Snackbar open={ticketSelector.success}>
					<FormAlert
						props={{ severity: "success", message: "Ticket Created!" }}
					/>
				</Snackbar>
			</>
		</>
	);
}

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
	Card,
	CardContent,
	CardActions,
	Box,
	Typography,
	Button,
	Divider,
	Link,
	Collapse,
	Chip,
	Stack,
	Grid,
	Grow,
	useMediaQuery,
} from "@mui/material";
import { blue, green, deepOrange } from "@mui/material/colors";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from "@mui/material/styles";

import CustomChip from "../dashboard/customChip";

export default function MyTicketCard({ props }) {
	const { item, showTicketForm, setSelectedTicketId, setSelectedProjectId } =
		props;
	const [isTicketSelected, setIsTicketSelected] = useState(false);
	let theme = createTheme();
	const isMediaSmall = useMediaQuery(theme.breakpoints.up("sm"));
	theme = responsiveFontSizes(theme);

	const navigate = useNavigate();

	const handleViewMoreTicket = () => {
		setIsTicketSelected(!isTicketSelected);
	};

	const handleUpdateTicket = (ticketId, projectId) => {
		setSelectedTicketId(ticketId);
		setSelectedProjectId(projectId);
		showTicketForm();
	};

	const formatTime = (time) => {
		const dateObject = new Date(time);

		const humanDateFormat = dateObject.toLocaleString();
		return humanDateFormat;
	};
	const viewMoreStyleSmall = {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	};
	const viewMoreStyleExtraSmall = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 0,
		padingBottom: "16px",
	};
	const myBlue = blue[500];
	const myGreen = green[500];
	const myDeepOrange = deepOrange[500];
	let borderColor = null;
	if (item.status === "progress") {
		borderColor = myDeepOrange;
	}
	if (item.status === "open") {
		borderColor = myBlue;
	}
	if (item.status === "resolved") {
		borderColor = myGreen;
	}

	const borderStyle = {
		marginBottom: "12px",
		borderLeftColor: borderColor,
		borderLeftWidth: "5px",
	};
	return (
		<ThemeProvider theme={theme}>
			<Grow appear={true} in={true}>
				<Card variant="outlined" sx={borderStyle}>
					<Grid container direction={"row"}>
						<Grid item xs={12} sm={9}>
							<Box padding={2}>
								<Grid item>
									<Typography variant="h6" paddingRight={1}>
										{item.title}
									</Typography>

									<Typography variant="subtitle2" color="GrayText">
										{`Created By: ${item.issuedBy.firstName} ${item.issuedBy.lastName} `}
									</Typography>
								</Grid>
								<Grid item>
									<Stack direction={"row"} spacing={1} marginTop={0.5}>
										<CustomChip props={{ type: "priority", item }} />

										<CustomChip props={{ type: "status", item }} />
									</Stack>
								</Grid>
							</Box>
						</Grid>

						<Grid item xs={12} sm={3} alignSelf={"center"}>
							<CardContent
								sx={isMediaSmall ? viewMoreStyleSmall : viewMoreStyleExtraSmall}
							>
								<Link
									component="button"
									variant="button"
									onClick={handleViewMoreTicket}
								>
									View More
								</Link>
							</CardContent>
						</Grid>
					</Grid>

					<Box>
						<Divider></Divider>
						<Collapse in={isTicketSelected}>
							<CardContent>
								<Typography variant="button">
									<strong>Description:</strong>
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									{item.description}
								</Typography>
								<Typography variant="button">
									<strong>ASSIGN TO</strong>:
								</Typography>
								<Stack direction={"row"} spacing={1} marginBottom={1}>
									{item.developers.map((name) => {
										return (
											<Chip
												key={name._id}
												label={`${name.firstName} ${name.lastName} `}
												size="small"
											/>
										);
									})}
								</Stack>
								<Stack direction={"column"}>
									<Typography variant="button" gutterBottom>
										<strong>CREATED AT</strong>: {formatTime(item.createdAt)}
									</Typography>
									<Typography variant="button">
										<strong>UPDATED AT</strong>: {formatTime(item.updatedAt)}
									</Typography>
								</Stack>
							</CardContent>
							<CardActions>
								<Button
									size="small"
									variant="contained"
									onClick={() => handleUpdateTicket(item._id, item.projectId)}
								>
									Update Ticket
								</Button>
								<Button
									size="small"
									variant="outlined"
									endIcon={
										<ArrowForwardIosRoundedIcon></ArrowForwardIosRoundedIcon>
									}
									onClick={() => {
										navigate(`/${item.projectId}`);
									}}
								>
									View Project
								</Button>
							</CardActions>
						</Collapse>
					</Box>
				</Card>
			</Grow>
		</ThemeProvider>
	);
}

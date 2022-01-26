import { useState } from "react";

import {
	Card,
	CardContent,
	Box,
	Typography,
	Divider,
	Link,
	Collapse,
	Chip,
	Stack,
	Grid,
	Grow,
	useMediaQuery,
} from "@mui/material";

import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from "@mui/material/styles";

import CustomChip from "./customChip";

function TicketCard({ props }) {
	const { item } = props;
	const [isTicketSelected, setIsTicketSelected] = useState(false);
	let theme = createTheme();
	const isMediaSmall = useMediaQuery(theme.breakpoints.up("sm"));
	theme = responsiveFontSizes(theme);

	const handleViewMoreTicket = () => {
		setIsTicketSelected(!isTicketSelected);
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
	};
	return (
		<ThemeProvider theme={theme}>
			<Grow appear={true} in={true}>
				<Card variant="outlined">
					<Grid container direction={"row"}>
						<Grid item xs={12} sm={9}>
							<CardContent>
								<Grid item>
									<Typography variant="h6" paddingRight={1}>
										{item.title}
									</Typography>

									<Typography variant="subtitle2" color="GrayText">
										{`Created By: ${item.issuedBy.firstName} ${item.issuedBy.lastName} `}
									</Typography>
								</Grid>
								<Grid item>
									<Stack direction={"row"} spacing={1}>
										<CustomChip props={{ type: "priority", item }} />

										<CustomChip props={{ type: "status", item }} />
									</Stack>
								</Grid>
							</CardContent>
						</Grid>

						<Grid item xs={12} sm={3}>
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
										<strong>CREATED AT</strong>: {item.createdAt}
									</Typography>
									<Typography variant="button">
										<strong>UPDATED AT</strong>: {item.updatedAt}
									</Typography>
								</Stack>
							</CardContent>
						</Collapse>
					</Box>
				</Card>
			</Grow>
		</ThemeProvider>
	);
}

export default TicketCard;

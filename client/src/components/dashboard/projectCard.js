import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Box,
	Typography,
	Button,
	Divider,
	Link,
	Collapse,
	Grow,
	useMediaQuery,
	Grid,
} from "@mui/material";

import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from "@mui/material/styles";

function ProjectCard({ props }) {
	let theme = createTheme();
	const isMediaSmall = useMediaQuery(theme.breakpoints.up("sm"));
	theme = responsiveFontSizes(theme);
	const [isProjectSelected, setIsProjectSelected] = useState(false);
	const navigate = useNavigate();
	const {
		tickets,
		createdAt,
		createdBy,
		description,
		title,
		developers,
		_id,
		setIsProjectFormVisible,
		setSelectedId,
	} = props;

	const handleViewProject = () => {
		setIsProjectSelected(!isProjectSelected);
	};

	const handleUpdateProject = async () => {
		setSelectedId(_id);
		setIsProjectFormVisible(true);
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
		paddingLeft: "16px",
	};

	return (
		<ThemeProvider theme={theme}>
			<Grow appear={true} in={true}>
				<Card variant="outlined" key={_id} sx={{ marginBottom: "12px" }}>
					<Grid container direction={"row"}>
						<Grid item xs={12} sm={9}>
							<CardHeader
								title={title}
								titleTypographyProps={{ variant: "h6" }}
								subheader={`Created By:${createdBy.firstName} ${createdBy.lastName}`}
								subheaderTypographyProps={{ variant: "subtitle2" }}
							/>
						</Grid>
						<Grid item xs={12} sm={3} alignSelf={"center"}>
							<CardActions
								sx={isMediaSmall ? viewMoreStyleSmall : viewMoreStyleExtraSmall}
							>
								<Link
									component="button"
									variant="button"
									onClick={handleViewProject}
								>
									View More
								</Link>
							</CardActions>
						</Grid>
					</Grid>

					<Box>
						<Divider></Divider>
						<Collapse in={isProjectSelected}>
							<CardContent>
								<Typography variant="button">
									<strong>Description:</strong>
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									{description}
								</Typography>
								<Typography
									gutterBottom
									variant="subtitle1"
									display={"flex "}
									alignItems={"center"}
								>
									<ConfirmationNumberRoundedIcon></ConfirmationNumberRoundedIcon>
									<strong>Number Of Tickets:</strong> {tickets.length}
								</Typography>
								<Typography
									gutterBottom
									variant="subtitle1"
									display={"flex "}
									alignItems={"center"}
								>
									<PersonRoundedIcon></PersonRoundedIcon>
									<strong>Number Of Developers:</strong> {developers.length}{" "}
								</Typography>

								<Typography variant="subtitle2">
									<strong>CREATED AT</strong>: {createdAt}
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									size="small"
									variant="contained"
									onClick={handleUpdateProject}
								>
									Update
								</Button>
								<Button
									size="small"
									variant="outlined"
									endIcon={
										<ArrowForwardIosRoundedIcon></ArrowForwardIosRoundedIcon>
									}
									onClick={() => {
										navigate(`${_id}`);
									}}
								>
									Create Ticket
								</Button>
							</CardActions>
						</Collapse>
					</Box>
				</Card>
			</Grow>
		</ThemeProvider>
	);
}

export default ProjectCard;

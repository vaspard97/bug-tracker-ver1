import { useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";

import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Box,
	Typography,
	Divider,
	Link,
	Collapse,
} from "@mui/material";

function ProjectDetailsCard({ props }) {
	const [isProjectSelected, setIsProjectSelected] = useState(true);

	const { selectedProject, numOfTicket } = props;

	const handleViewMoreProject = () => {
		setIsProjectSelected(!isProjectSelected);
	};

	return (
		<Card variant="outlined" key={selectedProject._id}>
			<Box display="flex" justifyContent="space-between">
				<CardHeader
					title={selectedProject.title}
					titleTypographyProps={{ variant: "h6" }}
					subheader={`Created By:${selectedProject.createdBy.firstName} ${selectedProject.createdBy.lastName}`}
					subheaderTypographyProps={{ variant: "subtitle2" }}
				/>

				<CardActions>
					<Link
						component="button"
						variant="button"
						onClick={handleViewMoreProject}
					>
						View More
					</Link>
				</CardActions>
			</Box>

			<Box>
				<Divider></Divider>
				<Collapse in={isProjectSelected} appear={true}>
					<CardContent>
						<Typography variant="button">
							<strong>Description:</strong>
						</Typography>
						<Typography gutterBottom variant="subtitle1">
							{selectedProject.description}
						</Typography>
						<Typography
							gutterBottom
							variant="subtitle1"
							display={"flex "}
							alignItems={"center"}
						>
							<ConfirmationNumberRoundedIcon></ConfirmationNumberRoundedIcon>
							<strong>Number Of Tickets:</strong>
							{numOfTicket}
						</Typography>
						<Typography
							gutterBottom
							variant="subtitle1"
							display={"flex "}
							alignItems={"center"}
						>
							<PersonRoundedIcon></PersonRoundedIcon>
							<strong>Number Of Developers:</strong>
							{selectedProject.developers.length}
						</Typography>

						<Typography variant="subtitle2">
							<strong>CREATED AT</strong>: {selectedProject.createdAt}
						</Typography>
					</CardContent>
				</Collapse>
			</Box>
		</Card>
	);
}

export default ProjectDetailsCard;

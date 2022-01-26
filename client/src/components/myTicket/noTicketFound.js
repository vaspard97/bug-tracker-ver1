import { Typography, Box, Button } from "@mui/material";

export default function NoTicketFound() {
	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			marginTop={6}
		>
			<Box>
				<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
					<div style={{ width: "150px", height: "150px" }}>
						<img
							src={
								"https://www.pikpng.com/pngl/b/138-1381540_copy-link-pikachu-meme-transparent-background-clipart.png"
							}
							alt={"suprise pikachu"}
							style={{ objectFit: "cover", width: "150px", height: "150px" }}
						/>
					</div>
				</Box>
				<Typography variant="h4" textAlign={"center"} gutterBottom>
					No Ticket Found
				</Typography>

				<Typography variant="subtitle1" textAlign={"center"} gutterBottom>
					Please create a new ticket through the project page or wait until you
					are assign one.
				</Typography>
				<Button variant="contained" fullWidth>
					View My Projects
				</Button>
			</Box>
		</Box>
	);
}

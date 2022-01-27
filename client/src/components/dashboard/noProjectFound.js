import { Typography, Box } from "@mui/material";
export default function NoProjectFound() {
	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			marginTop={4}
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
					No Project Found
				</Typography>

				<Typography variant="subtitle1" textAlign={"center"} gutterBottom>
					Please create a new project or wait until you are assign one.
				</Typography>
			</Box>
		</Box>
	);
}

import SignUp from "../form/signup";
import { Box } from "@mui/material";

export default function SignUpPage() {
	return (
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<SignUp />
		</Box>
	);
}

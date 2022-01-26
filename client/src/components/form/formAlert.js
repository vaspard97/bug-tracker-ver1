import * as React from "react";
import { Alert } from "@mui/material";

const FormAlert = React.forwardRef(({ props }, ref) => {
	return (
		<Alert severity="warning" ref={ref} {...props} sx={{ width: "100%" }}>
			{props.message}
		</Alert>
	);
});
export default FormAlert;

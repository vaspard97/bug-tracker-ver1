import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function SortingTooltip({ props }) {
	const { item } = props;
	return (
		<Tooltip title={item.label}>
			<IconButton size="small" sx={{ marginLeft: "8px" }}>
				{item.icon}
				<Typography variant="caption">{item.label}</Typography>
			</IconButton>
		</Tooltip>
	);
}

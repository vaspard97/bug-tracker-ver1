import { Chip, IconButton } from "@mui/material";

export default function ControlChips({ props }) {
	const { item } = props;
	return (
		<IconButton>
			<Chip label={item.label} icon={item.icon} />
		</IconButton>
	);
}

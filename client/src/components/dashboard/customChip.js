import { Chip } from "@mui/material";

export default function CustomChip({ props }) {
	const { type, item } = props;

	if (type === "priority") {
		switch (item.priority) {
			case "low":
				return (
					<Chip label="LOW" color="success" variant="outlined" size="small" />
				);
			case "medium":
				return (
					<Chip label="MED" color="warning" variant="outlined" size="small" />
				);
			case "high":
				return (
					<Chip label="HIGH" color="error" variant="outlined" size="small" />
				);

			default:
				return (
					<Chip label="NULL" color="disabled" variant="outlined" size="small" />
				);
		}
	}

	if (type === "status") {
		switch (item.status) {
			case "open":
				return (
					<Chip label="OPEN" color="primary" variant="filled" size="small" />
				);
			case "progress":
				return (
					<Chip
						label="PROGRESS"
						color="warning"
						variant="filled"
						size="small"
					/>
				);
			case "resolved":
				return (
					<Chip
						label="RESOLVED"
						color="success"
						variant="filled"
						size="small"
					/>
				);

			default:
				return (
					<Chip label="NULL" color="disabled" variant="outlined" size="small" />
				);
		}
	}
}

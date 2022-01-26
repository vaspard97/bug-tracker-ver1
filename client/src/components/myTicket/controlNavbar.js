import { Box, Stack } from "@mui/material";
import ControlChip from "./controlsChip";

import SortRoundedIcon from "@mui/icons-material/SortRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
export default function ControlNavBar() {
	const sortIcons = [
		{ icon: <SortRoundedIcon fontSize="small" />, label: "Sort" },
		{ icon: <FilterAltRoundedIcon fontSize="small" />, label: "Filter" },
	];
	return (
		<Box
			marginBottom={1}
			marginTop={1}
			marginLeft={"8px"}
			marginRight={"8px"}
			width={"100%"}
			display={"flex"}
		>
			<Box display={"flex"}>
				<Stack direction={"row"}>
					{sortIcons.map((item) => (
						<ControlChip props={{ item }} key={item.label} />
					))}
				</Stack>
			</Box>
		</Box>
	);
}

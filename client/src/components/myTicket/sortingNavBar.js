import { Box, Typography } from "@mui/material";
import SortingTooltip from "./sortingToolTip";
import SortByAlphaRoundedIcon from "@mui/icons-material/SortByAlphaRounded";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
export default function SortingNavBar() {
	const sortIcons = [
		{ icon: <SortByAlphaRoundedIcon />, label: " Title" },
		{ icon: <UpdateOutlinedIcon />, label: "Created At" },
		{ icon: <PriorityHighOutlinedIcon />, label: "Priority" },
		{ icon: <MoreHorizRoundedIcon />, label: "Status" },
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
			<Box display={"flex"} alignItems={"center"}>
				<Typography variant={"subtitle2"} color={"slategray"} noWrap>
					SORT BY:
				</Typography>
			</Box>
			<Box display={"flex"} overflow={"scroll"}>
				{sortIcons.map((item) => (
					<SortingTooltip props={{ item }} key={item.label} />
				))}
			</Box>
		</Box>
	);
}

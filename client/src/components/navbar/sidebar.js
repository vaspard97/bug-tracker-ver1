import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PersonIcon from "@mui/icons-material/Person";

import {
	Drawer as MUIDrawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Box,
	Divider,
	Typography,
	Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "../../redux/actions/user";

function Sidebar({ props }) {
	const { isSidebaropen, handleSidebar } = props;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userSelector = useSelector((state) => state.userReducers);
	const logout = () => {
		dispatch(signOut(navigate));
	};
	const itemList = [
		{ text: "Dashboard", icon: <DashboardIcon />, link: "" },
		{ text: "My Tickets", icon: <ConfirmationNumberIcon />, link: "ticket" },
		{ text: "Administration", icon: <PersonIcon />, link: "admin" },
	];

	return (
		userSelector.data && (
			<>
				<Box>
					<MUIDrawer
						open={isSidebaropen}
						variant="temporary"
						anchor="left"
						sx={{ position: "fixed" }}
						onClick={handleSidebar}
					>
						<Box
							display="flex"
							justifyContent="center "
							alignItems="center"
							paddingTop={1}
						>
							<Typography variant="body2">Hi Welcome</Typography>
						</Box>
						<Box display="flex" justifyContent="center " alignItems="center">
							<Typography variant="h6" color="primary">
								{userSelector.data.fullName}
							</Typography>
						</Box>
						<Box
							display="flex"
							justifyContent="center "
							alignItems="center"
							paddingBottom={1}
						>
							<Typography variant="subtitle2">
								{userSelector.data.email}
							</Typography>
						</Box>
						<Divider />
						<List>
							{itemList.map((item, index) => {
								const { text, icon, link } = item;
								return (
									<ListItem
										key={text}
										sx={{ width: "250px" }}
										button
										component={Link}
										to={link}
										onClick={handleSidebar}
									>
										{icon && <ListItemIcon>{icon}</ListItemIcon>}
										<ListItemText primary={text} />
									</ListItem>
								);
							})}
						</List>

						<Button
							sx={{ margin: "0.5rem" }}
							variant="contained"
							color="secondary"
							onClick={logout}
						>
							logout
						</Button>
					</MUIDrawer>
				</Box>
			</>
		)
	);
}

export default Sidebar;

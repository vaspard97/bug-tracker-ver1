import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions/user";
import SignUpPage from "./components/pages/SignUpPage";
import SuccessSignUpPage from "./components/pages/SuccessSignUpPage";
import SignInPage from "./components/pages/SignInPage";
import PrivatePage from "./components/pages/PrivatePage";
import MyTicketMain from "./components/myTicket/myticketmain";
import Dashboard from "./components/dashboard/dashboardMain";
import AdminTable from "./components/dashboard/admin";
import VerifyPage from "./components/pages/VerifyPage";
import ProjectDetails from "./components/dashboard/projectDetailsMain";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUser());
		// eslint-disable-next-line
	}, []);
	return (
		<Router>
			<Routes>
				<Route path="/" element={<PrivatePage />}>
					<Route index element={<Dashboard />} />
					<Route path="/:id" element={<ProjectDetails />}></Route>
					<Route path="ticket" element={<MyTicketMain />} />
					<Route path="admin" element={<AdminTable />} />
				</Route>
				<Route path="/signin" element={<SignInPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/signup/success" element={<SuccessSignUpPage />} />
				<Route path="user/verify-email/*" element={<VerifyPage />} />
			</Routes>
		</Router>
	);
}

export default App;

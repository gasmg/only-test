import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks";
import Layout from "./components/Layout";
import RequireAuth from "./hoc/RequireAuth";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App: FC = () => {
	const { state } = useAuth();

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							state.login ? (
								<Navigate to="profile" replace />
							) : (
								<Navigate to="login" replace />
							)
						}
					/>
					<Route
						path="login"
						element={
							state.login ? <Navigate to="/profile" replace /> : <Login />
						}
					/>
					<Route
						path="profile"
						element={
							<RequireAuth>
								<Profile />
							</RequireAuth>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;

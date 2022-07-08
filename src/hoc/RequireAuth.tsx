import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface IRequireAuthProps {
	children: JSX.Element;
}

const RequireAuth: FC<IRequireAuthProps> = ({ children }) => {
	const { state } = useAuth();

	if (!state.login) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default RequireAuth;

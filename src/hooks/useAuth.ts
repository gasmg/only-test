import { useContext } from "react";
import { AuthContext } from "../hoc/context/AuthContext";

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used inside a AuthProvider");
	}

	return context;
};

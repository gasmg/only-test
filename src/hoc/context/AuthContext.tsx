import { FC } from "react";
import { createContext, useReducer } from "react";

export enum AuthActionTypes {
	LOGINING = "LOGINING",
	LOGIN_SUCCESS = "LOGIN_SUCCESS",
	LOGIN_FAILURE = "LOGIN_FAILURE",
	LOGOUT = "LOGOUT",
}

interface LoginingAction {
	type: AuthActionTypes.LOGINING;
}

interface LoginSuccessAction {
	type: AuthActionTypes.LOGIN_SUCCESS;
	payload: string;
}

interface LoginFailureAction {
	type: AuthActionTypes.LOGIN_FAILURE;
	payload: string;
}

interface LogoutAction {
	type: AuthActionTypes.LOGOUT;
}

export type AuthAction =
	| LoginingAction
	| LoginSuccessAction
	| LoginFailureAction
	| LogoutAction;

export type Dispatch = (action: AuthAction) => void;
export type State = typeof defaultState;

interface IAuthContext {
	state: State;
	dispatch: Dispatch;
}

const defaultState = {
	login: "",
	isLoggedIn: false,
	isPending: false,
	errorText: "",
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

function authReducer(state: State, action: AuthAction) {
	switch (action.type) {
		case AuthActionTypes.LOGINING: {
			return {
				...defaultState,
				isPending: true,
			};
		}

		case AuthActionTypes.LOGIN_SUCCESS: {
			return {
				...state,
				login: action.payload,
				isPending: false,
			};
		}

		case AuthActionTypes.LOGIN_FAILURE: {
			return {
				...defaultState,
				errorText: action.payload,
			};
		}

		case AuthActionTypes.LOGOUT: {
			return {
				...defaultState,
			};
		}
	}
}

interface IAuthProvider {
	children: JSX.Element | JSX.Element[];
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, defaultState);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

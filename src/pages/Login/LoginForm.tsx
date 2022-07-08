import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledDefaultButton } from "../../components/Styled/Buttons";
import validationSchema from "./validation";
import { useAuth } from "../../hooks";
import { AuthActionTypes } from "../../hoc/context/AuthContext";
import { login } from "./auth";

const sharedStyles = css`
	font-size: 16px;
	font-weight: 400;
	line-height: 19px;
`;

const StyledForm = styled.form`
	max-width: 640px;
	width: 100%;

	label {
		color: var(--only-black-light);
		${sharedStyles}
	}
`;

const StyledInputInner = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const StyledInputLabel = styled.label<IStyledInputLabel>`
	color: var(--only-black-light);
	margin-bottom: 10px;
	position: relative;
	${sharedStyles}
`;

const StyledInputLabelLogin = styled(StyledInputLabel)`
	&::before {
		background: var(--only-red-light);
		border-radius: 50%;
		color: var(--only-red-dark);
		content: "!";
		display: ${(props) => (props.notFoundUserError ? "block" : "none")};
		font-size: 14px;
		left: 20px;
		height 20px;
		position: absolute;
		text-align: center;
		top: 50px;
		width: 20px;
	}
`;

const StyledInput = styled.input<IStyledInput>`
	background: var(--only-gray);
	border-radius: var(--border-radius);
	border: ${(props) =>
		props.requiredError ? "1px solid var(--only-red-dark)" : "none"};
	color: var(--only-black-lighter);
	height: 60px;
	outline: none;
	padding: 20px;
	${sharedStyles}

	&::placeholder {
		color: var(--only-black-ultra-lighter);
	}
`;

const StyledInputLogin = styled(StyledInput)`
	background: ${(props) =>
		props.notFoundUserError ? "var(--only-red-lighter)" : "var(--only-gray)"};
	border: ${(props) =>
		props.requiredError || props.notFoundUserError
			? "1px solid var(--only-red-dark)"
			: "none"};
	padding: ${(props) => (props.notFoundUserError ? "19px" : "20px")};
	padding-left: ${(props) => (props.notFoundUserError ? "54px" : "19px")};
`;

const StyledErrorText = styled.p`
	color: var(--only-red-dark);
	font-size: 14px;
	font-weight: 400;
	line-height: 16.7px;
	margin: 0;
	margin-top: 8px;
`;

const StyledCheckbox = styled.input`
	cursor: pointer;
	transform: scale(1.42);
`;

const StyledCheckboxLabel = styled.label`
	color: var(--only-black-light);
	cursor: pointer;
	margin-left: 17px;
	${sharedStyles}
`;

const StyledSubmitButton = styled(StyledDefaultButton)`
	background-color: var(--only-blue);
	color: var(--only-white);
	display: block;
	width: 100%;

	&:disabled {
		opacity: 0.5;
	}
`;

const StyledCheckboxInner = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 40px;
	padding-left: 4px;
`;

interface IStyledInputLabel {
	notFoundUserError?: boolean;
}

interface IStyledInput extends IStyledInputLabel {
	requiredError?: boolean;
}

export interface IFormInput {
	login: string;
	password: string;
}

const LoginForm: FC = () => {
	const { state, dispatch } = useAuth();

	const {
		control,
		handleSubmit,
		formState,
		formState: { errors },
		reset,
		setValue,
	} = useForm<IFormInput>({
		defaultValues: {
			login: "steve.jobs@example.com",
			password: "password",
		},
		resolver: yupResolver(validationSchema),
		mode: "onChange",
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		dispatch({
			type: AuthActionTypes.LOGINING,
		});

		try {
			await login(formData);
			dispatch({
				type: AuthActionTypes.LOGIN_SUCCESS,
				payload: formData.login,
			});
			navigate("/profile");
		} catch (e) {
			if (e instanceof Error) {
				dispatch({
					type: AuthActionTypes.LOGIN_FAILURE,
					payload: e.message,
				});
				setValue("login", e.message);
			}
		}
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful && state.login) {
			reset({ login: "", password: "" });
		}
	}, [formState, reset, state]);

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<StyledInputInner>
				<StyledInputLabelLogin
					notFoundUserError={Boolean(state.errorText)}
					htmlFor="login"
				>
					Логин
				</StyledInputLabelLogin>
				<Controller
					name="login"
					control={control}
					render={({ field }) => {
						return (
							<StyledInputLogin
								type="email"
								placeholder="Введите email"
								requiredError={Boolean(errors.login)}
								notFoundUserError={Boolean(state.errorText)}
								{...field}
							/>
						);
					}}
				/>
				{errors.login?.message && (
					<StyledErrorText>{errors.login?.message}</StyledErrorText>
				)}
			</StyledInputInner>
			<StyledInputInner>
				<StyledInputLabel htmlFor="password">Пароль</StyledInputLabel>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<StyledInput
							type="password"
							placeholder="Введите пароль"
							requiredError={Boolean(errors.password)}
							{...field}
						/>
					)}
				/>
				{errors.password?.message && (
					<StyledErrorText>{errors.password?.message}</StyledErrorText>
				)}
			</StyledInputInner>
			<StyledCheckboxInner>
				<StyledCheckbox type="checkbox" name="keepPassword" id="keepPassword" />
				<StyledCheckboxLabel htmlFor="keepPassword">
					Запомнить пароль
				</StyledCheckboxLabel>
			</StyledCheckboxInner>
			<StyledSubmitButton type="submit" disabled={state.isPending}>
				Войти
			</StyledSubmitButton>
		</StyledForm>
	);
};

export default LoginForm;

import { FC } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks";
import { AuthActionTypes } from "../../hoc/context/AuthContext";
import Container from "../../components/Container";
import { StyledDefaultButton } from "../../components/Styled/Buttons";
import { CenteringWrapper } from "../../components/Styled/CenteringWrapper";

const StyledText = styled.p`
	font-weight: 400;
	font-size: 40px;
	line-height: 48px;
	margin-bottom: 50px;

	span {
		font-family: "Helvetica-Neue-Bold";
		font-weight: 700;
	}
`;

const StyledLogoutButton = styled(StyledDefaultButton)`
	background-color: var(--only-gray);
	color: var(--only-black);
	display: block;
	width: 200px;
`;

const Profile: FC = () => {
	const { state, dispatch } = useAuth();

	const handleClick = () => {
		dispatch({
			type: AuthActionTypes.LOGOUT,
		});
	};

	return (
		<Container>
			<CenteringWrapper>
				<StyledText>
					Здравствуйте, <span>{state.login}</span>
				</StyledText>
				<StyledLogoutButton onClick={handleClick}>Выйти</StyledLogoutButton>
			</CenteringWrapper>
		</Container>
	);
};

export default Profile;

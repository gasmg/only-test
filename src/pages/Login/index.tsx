import { FC } from "react";
import Container from "../../components/Container";
import LoginForm from "./LoginForm";
import { CenteringWrapper } from "../../components/Styled/CenteringWrapper";

const Login: FC = () => {
	return (
		<Container>
			<CenteringWrapper>
				<LoginForm />
			</CenteringWrapper>
		</Container>
	);
};

export default Login;

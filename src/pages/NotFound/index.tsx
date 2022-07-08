import { FC } from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import { CenteringWrapper } from "../../components/Styled/CenteringWrapper";

const StyledTitle = styled.h2`
	font-size: 22px;
	line-height: 36px;
	font-weight: 400;
	margin: 0;
`;

const NotFound: FC = () => {
	return (
		<Container>
			<CenteringWrapper>
				<StyledTitle>
					Страница не найдена. Попробуйте перейти на главную страницу
				</StyledTitle>
			</CenteringWrapper>
		</Container>
	);
};

export default NotFound;

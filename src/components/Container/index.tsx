import { FC } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
	margin: 0 auto;
	max-width: 1240px;
	padding: 0 15px;
	height: 100%;
	width: 100%;
`;

interface ContainerProps {
	children: JSX.Element | JSX.Element[];
}

const Container: FC<ContainerProps> = ({ children }) => {
	return <StyledContainer>{children}</StyledContainer>;
};

export default Container;

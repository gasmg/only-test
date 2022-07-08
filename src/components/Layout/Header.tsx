import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
	padding: 40px 0;
	text-align: center;
`;

const StyledLogo = styled(Link).attrs({
	to: "/",
})`
	color: var(--only-black);
	font-family: "Helvetica-Neue-Bold";
	font-weight: 700;
	font-size: 64px;
	line-height: 78px;
	text-transform: uppercase;
`;

const Header: FC = () => {
	return (
		<StyledHeader>
			<StyledLogo>only.</StyledLogo>
		</StyledHeader>
	);
};

export default Header;

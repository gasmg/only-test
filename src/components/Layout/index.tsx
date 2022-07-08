import { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const StyledMain = styled.main`
	flex-grow: 1;
`;

const Layout: FC = () => {
	return (
		<StyledLayout>
			<Header />
			<StyledMain>
				<Outlet />
			</StyledMain>
		</StyledLayout>
	);
};

export default Layout;

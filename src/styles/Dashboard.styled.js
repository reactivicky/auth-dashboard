import styled from "@emotion/styled";
import {motion} from 'framer-motion'

export const Dashboard = styled(motion.div)`
	height: 100vh;
	width: 100%;
	display: grid;
	grid-template-columns: 250px auto;
	grid-template-rows: 4rem 1fr;
	overflow: hidden;
`;

export const Navbar = styled.nav`
	grid-column: span 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1); ;
`;

export const ImageContainer = styled.div`
	width: 8rem;
	background-color: black;

	img {
		max-width: 100%;
		max-height: 100%;
		display: block;
	}
`;

export const LogoutBtn = styled.button`
	border: none;
	background-color: transparent;
`;

export const Sidebar = styled(motion.aside)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: #edecf2;
	padding: 2rem 1rem;
`;

export const MinimizeButton = styled(motion.button)`
  border: none;
  background-color: transparent;
  display: flex;
  align-self: ${({sidebarOpen}) => sidebarOpen ? "flex-end" : "center"};
  margin-bottom: 1rem;
`

export const SidebarLinks = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const SidebarLink = styled.li`
	cursor: pointer;
	padding: 0.7rem;
  position: relative;
`;

export const SidebarLinkSpan = styled.span`
	position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: ${({sidebarOpen}) => sidebarOpen ? "flex-start" : "center"};;
`;

export const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: .5rem;
`

export const Workspace = styled.main`
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 100%;
`;

export const Files = styled.div`
  padding: 1rem;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
`;

export const PDFContainer = styled.div`
	overflow: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

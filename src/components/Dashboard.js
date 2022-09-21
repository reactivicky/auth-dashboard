import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { LayoutGroup, useAnimationControls } from "framer-motion";
import TableComponent from "./TableComponent";
import Logo from "../assets/missanLogo.svg";
import { FiLogOut } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { GrInProgress } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import {
	AiOutlineFileDone,
	AiOutlinePlusCircle,
	AiOutlineLeftCircle,
} from "react-icons/ai";
import * as S from "../styles/Dashboard.styled";

const Dashboard = ({ setLoading }) => {
	const [numPages, setNumPages] = useState([]);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [selectedFile, setSelectedFile] = useState({ id: "" });
	const [selectedFileUrl, setSelectedFileUrl] = useState("");
	const control = useAnimationControls();
	const dashboardControl = useAnimationControls();
	const [selectedLink, setSelectedLink] = useState({
		name: "My Tasks",
		id: 1,
		icon: <CgNotes />,
	});
	const navigate = useNavigate();
	const links = [
		{
			name: "My Tasks",
			id: 1,
			icon: <CgNotes />,
		},
		{
			name: "In Progress",
			id: 2,
			icon: <GrInProgress />,
		},
		{
			name: "Completed",
			id: 3,
			icon: <AiOutlineFileDone />,
		},
		{
			name: "New Process",
			id: 4,
			icon: <AiOutlinePlusCircle />,
		},
	];

	useEffect(() => {
		if (sidebarOpen) {
			control.start({
				width: "250px",
			});
			dashboardControl.start({
				gridTemplateColumns: "250px auto",
			});
		} else {
			control.start({
				width: "75px",
			});
			dashboardControl.start({
				gridTemplateColumns: "75px auto",
			});
		}
	}, [sidebarOpen, control, dashboardControl]);

	const handleLogout = () => {
		localStorage.removeItem("missanToken");
		navigate("/");
	};

	useEffect(() => {
		const token = localStorage.getItem("missanToken");
		if (selectedFile.id !== "") {
			setSelectedFileUrl(
				`https://dms.missancomputer.com:8081/windream.web.api/Documents/Download?parameter.item.id=${selectedFile.id}&access_token=${token}`
			);
		}
	}, [selectedFile]);

	const onDocumentLoadSuccess = ({ numPage }) => {
		setNumPages(numPage);
		setLoading(false);
	};

	const spring = {
		type: "spring",
		stiffness: 500,
		damping: 30,
	};

	return (
		<S.Dashboard animate={dashboardControl}>
			<S.Navbar>
				<S.ImageContainer>
					<img src={Logo} alt="logo" />
				</S.ImageContainer>
				<S.LogoutBtn title="logout" onClick={handleLogout}>
					<FiLogOut size={20} />
				</S.LogoutBtn>
			</S.Navbar>
			<S.Sidebar animate={control}>
				{sidebarOpen ? (
					<S.MinimizeButton
						sidebaropen={sidebarOpen.toString()}
						whileTap={{ scale: 0.9 }}
						onClick={() => setSidebarOpen(false)}
					>
						<AiOutlineLeftCircle size={20} />
					</S.MinimizeButton>
				) : (
					<S.MinimizeButton
						sidebaropen={sidebarOpen.toString()}
						whileTap={{ scale: 0.9 }}
						onClick={() => setSidebarOpen(true)}
					>
						<GiHamburgerMenu size={20} />
					</S.MinimizeButton>
				)}
				<LayoutGroup>
					<S.SidebarLinks>
						{links.map((link) => (
							<S.SidebarLink
								key={link.id}
								onClick={() => setSelectedLink(link)}
								title={link.name}
							>
								<S.SidebarLinkSpan sidebaropen={sidebarOpen.toString()}>
									{link.icon}
									{sidebarOpen && link.name}
								</S.SidebarLinkSpan>
								{selectedLink.name === link.name && (
									<S.Background
										layoutId="background"
										initial={false}
										animate={{ backgroundColor: "white" }}
										transition={spring}
									/>
								)}
							</S.SidebarLink>
						))}
					</S.SidebarLinks>
				</LayoutGroup>
			</S.Sidebar>
			<S.Workspace>
				<S.Files>
					<h2>My Tasks</h2>
					<TableComponent
						setLoading={setLoading}
						setSelectedFile={setSelectedFile}
						selectedFile={selectedFile}
					/>
				</S.Files>
				<S.PDFContainer>
					<Document
						onLoadError={() => setLoading(false)}
						onLoadProgress={() => setLoading(true)}
						file={selectedFileUrl}
						onLoadSuccess={onDocumentLoadSuccess}
						className="pdf-document"
					>
						{Array.from(new Array(numPages), (el, index) => (
							<Page className="pdf-page" key={`page_${index + 1}`} pageNumber={index + 1} />
						))}
					</Document>
				</S.PDFContainer>
			</S.Workspace>
		</S.Dashboard>
	);
};

export default Dashboard;

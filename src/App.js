import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Loader from "./components/Loader";
import Login from "./components/Login";
import * as S from './styles/App.styled'

const PrivateRoute = () => {
	const token = localStorage.getItem("missanToken");
	return token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
	const [loading, setLoading] = useState(false);

	return (
		<S.App>
			{loading && <Loader />}
			<Routes>
				<Route element={<Login setLoading={setLoading} />} path="/" />
				<Route element={<PrivateRoute />}>
					<Route
						element={<Dashboard setLoading={setLoading} />}
						path="/dashboard"
					/>
				</Route>
			</Routes>
		</S.App>
	);
}

export default App;

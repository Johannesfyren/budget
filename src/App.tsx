import { Outlet } from "react-router";
import "./App.css";
import SideNavBar from "./components/navigation/SideNavBar";

function App() {
	return (
		<div style={{ display: "flex" }}>
			<SideNavBar />
			<Outlet />
		</div>
	);
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./pages/createAccount";
import Login from "./pages/login";
import MainNav from "./pages/mainNav";
import { UserProvider } from "./components/userContext";
import "./App.css";

function App() {
	return (
		<UserProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/dreams/*" element={<MainNav />} />
					<Route path="/createAccount" element={<CreateAccount />} />
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";

import NavBar from "./components/navbar/NavBar";
import { useTheme } from "./hooks/useTheme";
import Profile from "./pages/profile/Profile";
const App = () => {
	const { mode } = useTheme();

	return (
		<div className={`${mode}`}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<Create />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/recipe/:id" element={<Recipe />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

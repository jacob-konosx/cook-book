import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";

import NavBar from "./components/navbar/NavBar";
import { useTheme } from "./hooks/useTheme";
const App = () => {
	const { mode } = useTheme();

	return (
		<div className={`App ${mode}`}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<Create />} />
					<Route path="/search" element={<Search />} />
					<Route path="/recipe/:id" element={<Recipe />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

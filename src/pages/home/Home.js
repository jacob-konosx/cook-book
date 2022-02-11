import React from "react";
import { useFetch } from "../../hooks/useFetch";
import RecipesList from "../../components/recipesList/RecipesList";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import { useTheme } from "../../hooks/useTheme";

const Home = () => {
	const { data, loading, error } = useFetch("http://localhost:3000/recipes");
	const { mode } = useTheme();

	return (
		<div className={`home ${mode}`}>
			<ThemeSelector />
			{error && <p className="error">{error}</p>}
			{loading && (
				<p className="loading">
					<div className="loader" />
				</p>
			)}
			{data && <RecipesList recipes={data} />}
		</div>
	);
};

export default Home;

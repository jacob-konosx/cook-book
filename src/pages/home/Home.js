import React from "react";
import RecipesList from "../../components/recipesList/RecipesList";
import ThemeSelector from "../../components/themeSelector/ThemeSelector";
import { useTheme } from "../../hooks/useTheme";
import useFire from "../../hooks/useFire";

const Home = () => {
	const { loading, data, error } = useFire();
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

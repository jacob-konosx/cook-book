import React from "react";
import { useFetch } from "../../hooks/useFetch";
import RecipesList from "../../components/recipesList/RecipesList";
const Home = () => {
	const { data, loading, error } = useFetch("http://localhost:3000/recipes");
	return (
		<div>
			{error && <p className="error">{error}</p>}
			{loading && <p className="loading">Loading...</p>}
			{data && <RecipesList recipes={data} />}
		</div>
	);
};

export default Home;

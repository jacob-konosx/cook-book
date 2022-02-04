import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./Recipe.css";
const Recipe = () => {
	const { data, loading, error } = useFetch("http://localhost:3000/recipes");
	const { id } = useParams();

	const Single = ({ recipes }) => {
		const singleRecipe = recipes.find((recipe) => recipe.id === id);
		const { title, ingredients, method, cookingTime } = singleRecipe;
		return (
			<div className="singleRecipe">
				<h2>{title}</h2>
				<p>{cookingTime} to cook.</p>
				<p className="ingredient">{ingredients.join(", ")}</p>
				<p>{method}</p>
			</div>
		);
	};

	return (
		<div>
			{error && <p className="error">{error}</p>}
			{loading && <p className="loading">Loading...</p>}
			{data && <Single recipes={data} />}
		</div>
	);
};

export default Recipe;

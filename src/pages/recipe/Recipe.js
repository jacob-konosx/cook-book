import React from "react";
import { useParams } from "react-router-dom";
import useFire from "../../hooks/useFire";
import { useTheme } from "../../hooks/useTheme";
import "./Recipe.css";
const Recipe = () => {
	const { mode } = useTheme();
	const { data, loading, error } = useFire();
	const { id } = useParams();

	const Single = ({ recipes }) => {
		const singleRecipe = recipes.find((recipe) => recipe.id === id);
		if (!singleRecipe) {
			return (
				<>
					<h1 style={{ textAlign: "center" }}>Invalid recipe ID</h1>
				</>
			);
		}
		const { title, ingredients, method, cookingTime } = singleRecipe;
		return (
			<div className={`singleRecipe ${mode}`}>
				<h2>{title}</h2>
				<p>{cookingTime} to cook.</p>
				<p className="ingredient">{ingredients.join(", ")}</p>
				<p>{method}</p>
			</div>
		);
	};

	return (
		<div className="recipe-view">
			{error && <p className="error">{error}</p>}
			{loading && (
				<p className="loading">
					<div className="loader" />
				</p>
			)}
			{data && <Single recipes={data} />}
		</div>
	);
};

export default Recipe;

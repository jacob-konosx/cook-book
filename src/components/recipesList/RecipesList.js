import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import "./RecipesList.css";
const RecipesList = ({ recipes }) => {
	const { mode } = useTheme();
	return (
		<div className="recipe-list">
			{recipes.map((recipe) => {
				return (
					<div key={recipe.id} className={`recipe ${mode}`}>
						<h2>{recipe.title}</h2>
						<h4>{recipe.cookingTime} to make.</h4>
						<p>{recipe.method.substring(0, 100)}...</p>
						<div className="center"></div>
						<Link to={`/recipe/${recipe.id}`}>Cook this</Link>
					</div>
				);
			})}
		</div>
	);
};

export default RecipesList;

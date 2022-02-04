import React from "react";
import { Link } from "react-router-dom";
import "./RecipesList.css";
const RecipesList = ({ recipes }) => {
	return (
		<div className="recipe-list">
			{recipes.map((recipe) => {
				return (
					<div key={recipe.id} className="recipe">
						<h2>{recipe.title}</h2>
						<h4>{recipe.cookingTime} to make.</h4>
						<p>{recipe.method.substring(0, 100)}...</p>
						<Link to={`/recipe/${recipe.id}`}>Cook this</Link>
					</div>
				);
			})}
		</div>
	);
};

export default RecipesList;

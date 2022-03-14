import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import "./RecipesList.css";
const RecipesList = ({ recipes }) => {
	const { mode } = useTheme();
	const navigate = useNavigate();
	return (
		<div className="recipe-list">
			{recipes.map((recipe) => {
				return (
					<div key={recipe.id} className={`recipe ${mode}`}>
						<h2>{recipe.title}</h2>
						<h4>{recipe.cookingTime} to make.</h4>
						<p>{recipe.method.substring(0, 100)}...</p>
						{recipe.author && (
							<p
								style={{ fontSize: 12 }}
								onClick={() => navigate(`/user/${recipe.uid}`)}
							>
								Author:{" "}
								<span style={{ textDecoration: "underline" }}>
									{recipe.author}
								</span>
							</p>
						)}
						<Link to={`/recipe/${recipe.id}`}>Cook this</Link>
					</div>
				);
			})}
		</div>
	);
};

export default RecipesList;

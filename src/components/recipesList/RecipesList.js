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
						<h1 style={{ fontSize: 14 }}>
							Author:{" "}
							<span
								onClick={() => navigate(`/user/${recipe.uid}`)}
								style={{
									textDecoration: "underline",
									cursor: "pointer",
								}}
							>
								{recipe.author}
							</span>
						</h1>
						<h5>{recipe.cookingTime} to make.</h5>
						<p>{recipe.method.substring(0, 100)}...</p>

						<Link to={`/recipe/${recipe.id}`}>Cook this</Link>
					</div>
				);
			})}
		</div>
	);
};

export default RecipesList;

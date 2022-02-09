import React from "react";
import { useState } from "react/cjs/react.development";
import { useFetch } from "../../hooks/useFetch";

import "./Create.css";
const Create = () => {
	const { postData } = useFetch("http://localhost:3000/recipes", "POST");
	const [recipe, setRecipe] = useState({
		title: "",
		temp: "",
		ingredients: [],
		method: "",
		cookingTime: "",
	});
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setRecipe({ ...recipe, [name]: value });
	};
	const handleAdd = (e) => {
		e.preventDefault();
		if (recipe.temp) {
			setRecipe({
				...recipe,
				temp: "",
				ingredients: [...recipe.ingredients, recipe.temp],
			});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			recipe.title &&
			recipe.ingredients.length > 0 &&
			recipe.method &&
			recipe.cookingTime
		) {
			const newRecipe = {
				...recipe,
				cookingTime: `${recipe.cookingTime} minutes`,
				id: new Date().getTime().toString(),
			};
			delete newRecipe.temp;
			postData(newRecipe);
			window.location.href = "/";
		}
	};
	return (
		<>
			<article className="form">
				<h1>Add a new recipe</h1>
				<form>
					<div className="form-control">
						<label htmlFor="title">Recipe title: </label>
						<input
							type="text"
							id="title"
							name="title"
							value={recipe.title}
							onChange={handleChange}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="ingredients">Recipe ingredients:</label>
						<input
							type="text"
							id="temp"
							name="temp"
							value={recipe.temp}
							onChange={handleChange}
						/>
						<button
							className="add-btn"
							type="submit"
							onClick={handleAdd}
						>
							Add
						</button>
					</div>

					<label>
						Current ingredients:
						{" " + recipe.ingredients.join(", ")}
					</label>
					<div className="form-control">
						<label htmlFor="method">Recipe method: </label>
						<textarea
							type="text"
							id="method"
							name="method"
							rows="4"
							value={recipe.method}
							onChange={handleChange}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="cookingTime">
							Cooking time (in minutes):{" "}
						</label>
						<input
							type="number"
							id="cookingTime"
							name="cookingTime"
							value={recipe.cookingTime}
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="btn"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</form>
			</article>
		</>
	);
};

export default Create;

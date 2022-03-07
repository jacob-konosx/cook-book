import React, { useReducer, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import "./Create.css";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { ModalReducer } from "./ModalReducer";
import app from "../../utils/firebase";
const Create = () => {
	const { color } = useTheme();
	const [recipe, setRecipe] = useState({
		title: "",
		temp: "",
		ingredients: [],
		method: "",
		cookingTime: "",
	});
	const [state, dispatch] = useReducer(ModalReducer, {
		isOpen: false,
		content: "",
	});
	const navigate = useNavigate();
	const db = getFirestore(app);
	const recipesCollectionRef = collection(db, "recipes");

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
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			recipe.title &&
			recipe.ingredients.length > 0 &&
			recipe.method &&
			recipe.cookingTime
		) {
			if (localStorage.getItem("loginData") === null) {
				dispatch({ type: "NO_LOGIN" });
				return;
			}
			const newRecipe = {
				...recipe,
				cookingTime: `${recipe.cookingTime} minutes`,
				id: new Date().getTime().toString(),
				author: localStorage.getItem("loginData")
					? JSON.parse(localStorage.getItem("loginData")).name
					: null,
			};
			delete newRecipe.temp;
			await addDoc(recipesCollectionRef, newRecipe);
			navigate("/");
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
							style={{ backgroundColor: color }}
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
						style={{ backgroundColor: color }}
						type="submit"
						className="btn"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</form>
			</article>
			{state.isOpen && (
				<Modal
					closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
					modalContent={state.content}
				/>
			)}
		</>
	);
};

export default Create;

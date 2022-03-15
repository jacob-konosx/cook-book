import React, { useReducer, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

import app from "../../utils/firebase";
import useFire from "../../hooks/useFire";
import { useTheme } from "../../hooks/useTheme";
import "../create/Create.css";
import { ModalReducer } from "../../components/modal/ModalReducer";
import Modal from "../../components/modal/Modal";

const Update = () => {
	const { color, mode } = useTheme();
	const { id } = useParams();
	const { loading, data, error } = useFire("__name__", id);

	const [recipe, setRecipe] = useState(null);
	const [state, dispatch] = useReducer(ModalReducer, {
		isOpen: false,
		content: "",
	});
	if (data && recipe === null) {
		if (data.length === 1) {
			const fireRecipe = data[0];
			setRecipe({
				...fireRecipe,
				temp: "",
				cookingTime: fireRecipe.cookingTime.match(/\d+/)[0], // "3"
			});
		}
	}

	const navigate = useNavigate();
	const db = getFirestore(app);

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
			//Validate Title
			if (
				!/^(?=.{5,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/.test(
					recipe.title
				)
			) {
				dispatch({
					type: "ERROR",
					payload: `Invalid Title: No Special Characters (${recipe.title.length}/5-50 Len)`,
				});
				return;
			}
			//Validate Method
			if (!/^(?=.{10,500}$)/.test(recipe.method)) {
				dispatch({
					type: "ERROR",
					payload: `Invalid Method: (${recipe.method.length}/10-500 Len)`,
				});
				return;
			}
			const newRecipe = {
				...recipe,
				cookingTime: `${recipe.cookingTime} minutes`,
			};
			delete newRecipe.temp;
			try {
				await setDoc(doc(db, "recipes", id), newRecipe);
			} catch (error) {
				if (error.name === "FirebaseError") {
					dispatch({ type: "PERMISSION_ERROR" });
					return;
				} else {
					dispatch({ type: "ERROR", payload: "Error!" });
				}
			}
			navigate("/profile");
		}
	};
	const handleIngredient = (ingredient) => {
		setRecipe((rec) => {
			return {
				...rec,
				ingredients: rec.ingredients.filter((i) => i !== ingredient),
			};
		});
	};
	if (localStorage.getItem("loginData")) {
		if (data && recipe) {
			return (
				<>
					{JSON.parse(localStorage.getItem("loginData")).uid ===
						recipe.uid && !loading ? (
						<article className="form">
							<h1>{`Update recipe`}</h1>
							<form>
								<div className="form-control">
									<label htmlFor="title">
										Recipe title:{" "}
									</label>
									<input
										type="text"
										id="title"
										name="title"
										value={recipe.title}
										onChange={handleChange}
									/>
								</div>
								<div className="form-control">
									<label htmlFor="ingredients">
										Recipe ingredients:
									</label>
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
									Current ingredients (Click to remove):
									<div className="ingredients">
										{recipe.ingredients.map(
											(ingredient) => {
												return (
													<span key={ingredient}>
														<span
															className={mode}
															onClick={() =>
																handleIngredient(
																	ingredient
																)
															}
														>
															{ingredient}
														</span>
														<span>, </span>
													</span>
												);
											}
										)}
									</div>
								</label>
								<div className="form-control">
									<label htmlFor="method">
										Recipe method:
									</label>
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
									Update
								</button>
							</form>
						</article>
					) : (
						<h2 style={{ textAlign: "center" }}>
							This is not your recipe
						</h2>
					)}
					{state.isOpen && (
						<Modal
							closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
							modalContent={state.content}
						/>
					)}
				</>
			);
		} else {
			return (
				<>
					{error && <p className="error">{error}</p>}
					{loading && (
						<p className="loading">
							<div className="loader" />
						</p>
					)}
				</>
			);
		}
	} else {
		return <h2 style={{ textAlign: "center" }}>Login first</h2>;
	}
};

export default Update;

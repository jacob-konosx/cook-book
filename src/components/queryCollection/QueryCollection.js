import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import useFire from "../../hooks/useFire";
import app from "../../utils/firebase";
import "./QueryCollection.css";
const QueryCollection = ({ uid }) => {
	const { loading, data, error } = useFire("uid", uid);
	const deleteHandler = async (id, title) => {
		const conf = window.confirm(`Do you want to delete recipe: ${title}?`);
		if (conf) {
			const db = getFirestore(app);
			try {
				await deleteDoc(doc(db, "recipes", `${id}`));
			} catch (error) {
				window.alert(error);
			}
		}
	};
	let profilePage = true;
	if (window.location.href.includes("user")) {
		profilePage = false;
	}
	return (
		<div>
			{error && <p className="error">{error}</p>}
			{loading && (
				<p className="loading">
					<div className="loader" />
				</p>
			)}
			{data &&
				data.map((recipe) => {
					const { id, title, method } = recipe;
					return (
						<div
							key={id}
							className={` recipe`}
							id="profileRecipe"
							style={{ transform: "none" }}
						>
							<h2>{title}</h2>
							<p>{method}...</p>

							<Link to={`/recipe/${id}`}>View</Link>

							{profilePage && (
								<>
									<a
										href="/profile"
										onClick={() => deleteHandler(id, title)}
									>
										Delete
									</a>
									<Link to={`/update/${id}`}>Update</Link>
								</>
							)}
						</div>
					);
				})}
			{data && !loading && data.length === 0 && <h2>No recipes found</h2>}
		</div>
	);
};

export default QueryCollection;

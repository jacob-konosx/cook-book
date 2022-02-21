import React from "react";
import { useLocation } from "react-router-dom";
import RecipesList from "../../components/recipesList/RecipesList";
import "./Search.css";
import useFire from "../../hooks/useFire";
const useQuery = () => {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
};

const Search = () => {
	const { data, loading, error } = useFire();

	let filteredData = null;
	let query = useQuery();
	const searchTerm = query.get("q");

	if (!searchTerm) {
		return (
			<h1 style={{ textAlign: "center" }}>Enter a valid search term!</h1>
		);
	}
	if (data) {
		filteredData = data.filter((recipe) =>
			recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
	return (
		<div>
			{searchTerm && (
				<h1 style={{ textAlign: "center" }}>
					Recipes including {searchTerm}:
				</h1>
			)}
			{error && <p className="error">{error}</p>}
			{loading && (
				<p className="loading">
					<div className="loader" />
				</p>
			)}
			{filteredData && <RecipesList recipes={filteredData} />}
			{!loading && (!filteredData || filteredData.length === 0) && (
				<h2 style={{ textAlign: "center" }}>No recipes found</h2>
			)}
		</div>
	);
};

export default Search;

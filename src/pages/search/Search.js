import React from "react";
import { useLocation } from "react-router-dom";
import RecipesList from "../../components/recipesList/RecipesList";
import { useFetch } from "../../hooks/useFetch";
import "./Search.css";
const useQuery = () => {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
};
const Search = () => {
	let query = useQuery();
	const searchTerm = query.get("q");

	const { data, loading, error } = useFetch(
		`http://localhost:3000/recipes?q=${searchTerm}`
	);
	if (!searchTerm) {
		return (
			<h1 style={{ textAlign: "center" }}>Enter a valid search term!</h1>
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
			{loading && <p className="loading">Loading...</p>}
			{data && <RecipesList recipes={data} />}
			{!loading && (!data || data.length === 0) && (
				<h2 style={{ textAlign: "center" }}>No recipes found</h2>
			)}
		</div>
	);
};

export default Search;

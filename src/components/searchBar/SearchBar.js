import React from "react";
import "./SearchBar.css";
const SearchBar = () => {
	return (
		<form action="/search" method="get">
			<label htmlFor="header-search">
				<span>Search: </span>
			</label>
			<input type="text" name="q" />
		</form>
	);
};

export default SearchBar;

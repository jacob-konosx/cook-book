import React from "react";
import "./SearchBar.css";
const SearchBar = () => {
	return (
		<form action="/search" method="get">
			<label htmlFor="header-search">
				<span>Search: </span>
			</label>
			<input id="header-search" type="text" name="q" />
		</form>
	);
};

export default SearchBar;

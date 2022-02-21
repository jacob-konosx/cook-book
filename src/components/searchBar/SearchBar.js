import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
const SearchBar = () => {
	const navigate = useNavigate();
	const [inputText, setInputText] = useState("");
	const submitHandler = (e) => {
		e.preventDefault();
		navigate(`/search?q=${inputText}`);
		setInputText("");
	};
	return (
		<form onSubmit={submitHandler}>
			<span>Search: </span>
			<input
				id="header-search"
				type="search"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
			/>
		</form>
	);
};

export default SearchBar;

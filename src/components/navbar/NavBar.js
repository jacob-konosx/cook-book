import React from "react";
import SearchBar from "./../searchBar/SearchBar";
import "./NavBar.css";
const NavBar = () => {
	return (
		<nav class="navbar">
			<div class="navbar-logo">
				<a href="/">
					<h2>Cook Book</h2>
				</a>
			</div>
			<div class="navbar-menu">
				<ul>
					<SearchBar />

					<li>
						<a href="/create">create recipe</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./../searchBar/SearchBar";
import "./NavBar.css";
const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="nav-items">
				<div className="navbar-logo">
					<a href="/">
						<h2>Cook Book</h2>
					</a>
				</div>
				<div className="navbar-menu">
					<ul>
						<SearchBar />

						<li>
							<Link to="/create">create recipe</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

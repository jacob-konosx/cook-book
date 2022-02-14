import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import SearchBar from "./../searchBar/SearchBar";
import "./NavBar.css";
const NavBar = () => {
	const { color } = useTheme();
	return (
		<nav className="navbar" style={{ backgroundColor: color }}>
			<div className="nav-items">
				<div className="navbar-logo">
					<Link to="/">Cook Book</Link>
				</div>
				<div className="navbar-menu">
					<ul>
						<SearchBar />

						<li>
							<Link
								style={{ backgroundColor: color }}
								to="/create"
							>
								create recipe
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import GoogleAuth from "../googleAuth/GoogleAuth";
import SearchBar from "./../searchBar/SearchBar";

import "./NavBar.css";
const NavBar = () => {
	const navigate = useNavigate();
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
							<div className="loginContainer">
								<button
									className="logout"
									style={{ backgroundColor: color }}
									onClick={() => navigate("/create")}
								>
									create recipe
								</button>
							</div>
						</li>
						<li>
							<GoogleAuth />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
//
export default NavBar;

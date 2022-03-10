import React from "react";
import QueryCollection from "../../components/queryCollection/QueryCollection";
import { useTheme } from "../../hooks/useTheme";
import "./Profile.css";
const Profile = () => {
	const { mode } = useTheme();
	const loggedIn = JSON.parse(localStorage.getItem("loginData"));

	return (
		<div className="recipe-view">
			{loggedIn ? (
				<div className={`profile ${mode}`}>
					<img src={loggedIn.picture} alt="profile" />
					<h2>{loggedIn.name}</h2>
					<p className="email">{loggedIn.email}</p>
					<QueryCollection uid={loggedIn.uid} />
				</div>
			) : (
				<h2 style={{ textAlign: "center" }}>Login first</h2>
			)}
		</div>
	);
};

export default Profile;

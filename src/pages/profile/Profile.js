import React from "react";
import { useNavigate } from "react-router-dom";
import QueryCollection from "../../components/queryCollection/QueryCollection";
import { useTheme } from "../../hooks/useTheme";
import "./Profile.css";
const Profile = () => {
	const { mode, color } = useTheme();
	const navigate = useNavigate();

	const loggedIn = JSON.parse(localStorage.getItem("loginData"));
	return (
		<div className="recipe-view">
			{loggedIn ? (
				<div className={`profile ${mode}`}>
					<img
						className="profileImg"
						src={loggedIn.picture}
						alt="profile"
					/>
					<h2>{loggedIn.name}</h2>
					<p className="email">{loggedIn.email}</p>
					<p className="email">{loggedIn.description}</p>
					<button
						style={{
							backgroundColor: color,
						}}
						type="submit"
						className="updateBtn"
						onClick={() => navigate("update")}
					>
						Update Profile
					</button>
					<QueryCollection uid={loggedIn.uid} />
				</div>
			) : (
				<h2 style={{ textAlign: "center" }}>Login first</h2>
			)}
		</div>
	);
};

export default Profile;

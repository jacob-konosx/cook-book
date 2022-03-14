import React from "react";
import { useParams } from "react-router-dom";
import QueryCollection from "../../components/queryCollection/QueryCollection";
import useFire from "../../hooks/useFire";
import { useTheme } from "../../hooks/useTheme";
import "../profile/Profile.css";
const UserProfile = () => {
	const { mode } = useTheme();
	const { id } = useParams();
	const { error, data, loading } = useFire("uid", `${id}`, "users");

	if (data && data.length !== 0) {
		var userData = data[0];
	}
	return (
		<div className="recipe-view">
			{error && <p className="error">{error}</p>}
			{loading && (
				<p className="loading">
					<div className="loader" />
				</p>
			)}

			{data && data.length !== 0 && (
				<div className={`profile ${mode}`}>
					<img
						className="profileImg"
						src={userData.picture}
						alt="profile"
					/>
					<h2>{userData.name}</h2>
					<p className="email">{userData.email}</p>
					<p className="email">{userData.description}</p>

					<QueryCollection uid={userData.uid} />
				</div>
			)}
			{data && !loading && data.length === 0 && (
				<h2 style={{ textAlign: "center" }}>User Doesn't Exist</h2>
			)}
		</div>
	);
};

export default UserProfile;

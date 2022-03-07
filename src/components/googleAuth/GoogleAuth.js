import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import {
	signInWithPopup,
	GoogleAuthProvider,
	getAuth,
	signOut,
} from "firebase/auth";

import "./GoogleAuth.css";
import app from "../../utils/firebase";
const GoogleAuth = () => {
	const { color } = useTheme();
	const [loginData, setLoginData] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData"))
			: null
	);
	const auth = getAuth(app);
	const handleLogout = (googleData) => {
		signOut(auth)
			.then(() => {
				localStorage.removeItem("loginData");
				setLoginData(null);
			})
			.catch((error) => {
				alert(error);
			});
	};
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((re) => {
				const { displayName, email, photoURL } = re.user;
				const data = {
					name: displayName,
					email: email,
					picture: photoURL,
				};
				setLoginData(data);
				localStorage.setItem("loginData", JSON.stringify(data));
			})
			.catch((error) => alert(error));
	};
	return (
		<div>
			{loginData ? (
				<div className="loginContainer">
					<button
						className="logout"
						style={{ backgroundColor: color }}
						onClick={handleLogout}
					>
						logout
					</button>
					<img src={loginData.picture} alt="profile" />
					<h2>{loginData.name}</h2>
				</div>
			) : (
				<div className="loginContainer">
					<button
						className="logout"
						style={{ backgroundColor: color }}
						onClick={signInWithGoogle}
					>
						login
					</button>
				</div>
			)}
		</div>
	);
};

export default GoogleAuth;

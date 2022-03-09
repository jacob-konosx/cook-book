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
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {
	const { color } = useTheme();
	const [loginData, setLoginData] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData"))
			: null
	);
	const navigate = useNavigate();
	const auth = getAuth(app);
	const handleLogout = (googleData) => {
		signOut(auth)
			.then(() => {
				localStorage.removeItem("loginData");
				setLoginData(null);
				window.location.reload();
			})
			.catch((error) => {
				alert(error);
			});
	};
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((re) => {
				const { displayName, email, photoURL, uid } = re.user;
				const data = {
					name: displayName,
					email: email,
					picture: photoURL,
					uid: uid,
				};
				setLoginData(data);
				localStorage.setItem("loginData", JSON.stringify(data));
				window.location.reload();
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
						onClick={() => navigate("/profile")}
					>
						profile
					</button>
					<button
						className="logout"
						style={{ backgroundColor: color }}
						onClick={handleLogout}
					>
						logout
					</button>
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

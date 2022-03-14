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
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	where,
} from "firebase/firestore";
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
				window.location.href = "/";
			})
			.catch((error) => {
				alert(error);
			});
	};
	const getFireUser = async (googleData) => {
		const db = getFirestore(app);
		const userCollection = collection(db, "users");
		const userCollectionQuery = query(
			userCollection,
			where("uid", "==", googleData.uid)
		);
		const data = await getDocs(userCollectionQuery);
		const user = data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		if (user.length === 1) {
			setLoginData(user[0]);
			localStorage.setItem("loginData", JSON.stringify(user[0]));
		} else {
			let creationData = {
				...googleData,
				description: "Novice Chef",
			};
			await setDoc(doc(db, "users", googleData.uid), creationData);
			creationData["id"] = googleData.uid;
			setLoginData(creationData);
			localStorage.setItem("loginData", JSON.stringify(creationData));
		}
		window.location.reload();
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
				getFireUser(data);
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

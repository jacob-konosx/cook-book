/* eslint-disable no-useless-escape */
import React, { useReducer, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import app from "../../utils/firebase";
import { useTheme } from "../../hooks/useTheme";
import "../create/Create.css";
import { ModalReducer } from "../../components/modal/ModalReducer";
import Modal from "../../components/modal/Modal";

const Update = () => {
	const [loginData, setLoginData] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData"))
			: null
	);
	const { color } = useTheme();
	const [state, dispatch] = useReducer(ModalReducer, {
		isOpen: false,
		content: "",
	});
	const navigate = useNavigate();
	const db = getFirestore(app);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setLoginData({ ...loginData, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			loginData.description &&
			loginData.email &&
			loginData.name &&
			loginData.picture
		) {
			//Validate Name
			if (
				!/^(?=.{3,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/.test(
					loginData.name
				)
			) {
				dispatch({
					type: "ERROR",
					payload: `Invalid Username: No Special Characters (${loginData.name.length}/3-25 Len)`,
				});
				return;
			}
			//Validate Email
			if (
				!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
					loginData.email
				)
			) {
				dispatch({ type: "ERROR", payload: "Invalid Email" });
				return;
			}
			//Validate Description
			if (!/^(?=.{5,200}$)/.test(loginData.description)) {
				dispatch({
					type: "ERROR",
					payload: `Invalid Description: (${loginData.description.length}/5-200 Len)`,
				});
				return;
			}
			//Validate Picture URL
			if (
				!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
					loginData.picture
				)
			) {
				dispatch({
					type: "ERROR",
					payload: "Invalid Picture URL",
				});
				return;
			}
			try {
				await setDoc(doc(db, "users", loginData.id), loginData);
				localStorage.setItem("loginData", JSON.stringify(loginData));
			} catch (error) {
				if (error.name === "FirebaseError") {
					dispatch({ type: "PERMISSION_ERROR" });
					return;
				} else {
					dispatch({ type: "ERROR", payload: "Error!" });
				}
			}
			navigate("/profile");
		}
	};

	if (loginData) {
		return (
			<>
				<article className="form">
					<h1>{`Update Profile`}</h1>
					<form>
						<div className="form-control">
							<label htmlFor="name">Name: </label>
							<input
								type="text"
								id="name"
								name="name"
								value={loginData.name}
								onChange={handleChange}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="email">Email: </label>
							<input
								type="email"
								id="email"
								name="email"
								value={loginData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="description">Description: </label>
							<input
								type="text"
								id="description"
								name="description"
								value={loginData.description}
								onChange={handleChange}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="picture">
								Picture (Image URL):
							</label>
							<input
								type="url"
								id="picture"
								name="picture"
								value={loginData.picture}
								onChange={handleChange}
							/>
						</div>
						<button
							style={{ backgroundColor: color }}
							type="submit"
							className="btn"
							onClick={handleSubmit}
						>
							Update
						</button>
					</form>
				</article>
				{state.isOpen && (
					<Modal
						closeModal={() => dispatch({ type: "CLOSE_MODAL" })}
						modalContent={state.content}
					/>
				)}
			</>
		);
	} else {
		return <h2 style={{ textAlign: "center" }}>Login first</h2>;
	}
};

export default Update;

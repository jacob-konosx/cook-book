import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useTheme } from "../../hooks/useTheme";
import "./GoogleAuth.css";
const GoogleAuth = () => {
	const { color } = useTheme();
	const [loginData, setLoginData] = useState(
		localStorage.getItem("loginData")
			? JSON.parse(localStorage.getItem("loginData"))
			: null
	);
	const handleFailure = (result) => {
		alert(result);
	};
	const handleLogin = async (googleData) => {
		const res = await fetch("/api/google-login", {
			method: "POST",
			body: JSON.stringify({ token: googleData.tokenId }),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		setLoginData(data);
		localStorage.setItem("loginData", JSON.stringify(data));
	};
	const handleLogout = (googleData) => {
		localStorage.removeItem("loginData");
		setLoginData(null);
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
				<div className="googleLogin">
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
						buttonText="Login"
						onSuccess={handleLogin}
						onFailure={handleFailure}
						cookiePolicy={"single_host_origin"}
					/>
				</div>
			)}
		</div>
	);
};

export default GoogleAuth;

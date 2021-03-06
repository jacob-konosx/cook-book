import { createContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, { type, payload }) => {
	switch (type) {
		case "COLOR":
			return { ...state, color: payload };
		case "MODE":
			return { ...state, mode: payload };
		default:
			return state;
	}
};

export const ThemeProvider = ({ children }) => {
	const [state, dispatch] = useReducer(themeReducer, {
		color: window.localStorage.getItem("color") || "#58249c",
		mode: window.localStorage.getItem("mode") || "light",
	});

	const changeMode = (mode) => {
		dispatch({ type: "MODE", payload: mode });
	};
	const changeColor = (color) => {
		dispatch({ type: "COLOR", payload: color });
	};

	useEffect(() => {
		window.localStorage.setItem("mode", state.mode);
		window.localStorage.setItem("color", state.color);
	}, [state.mode, state.color]);

	return (
		<ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

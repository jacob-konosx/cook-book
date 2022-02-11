import { createContext } from "react";
import { useReducer } from "react/cjs/react.development";

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
		color: "#58249c",
		mode: "light",
	});

	const changeMode = (mode) => {
		dispatch({ type: "MODE", payload: mode });
	};
	const changeColor = (color) => {
		dispatch({ type: "COLOR", payload: color });
	};
	return (
		<ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
	const theme = useContext(ThemeContext);
	const { changeColor, changeMode, color, mode } = theme;
	return { changeColor, changeMode, color, mode };
};

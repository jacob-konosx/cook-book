import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
	const { changeColor, changeMode, color, mode } = useContext(ThemeContext);
	return { changeColor, changeMode, color, mode };
};

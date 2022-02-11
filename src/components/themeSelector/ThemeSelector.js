import React from "react";
import { useTheme } from "../../hooks/useTheme";
import modeImg from "../../assets/mode.png";
import "./ThemeSelector.css";
const colors = ["#e46b71", "#99ffff", "#58249c"];
const ThemeSelector = () => {
	const { changeColor, changeMode, mode } = useTheme();

	const handleMode = () => {
		changeMode(mode === "light" ? "dark" : "light");
	};
	return (
		<div className="theme-selector">
			<div className="mode">
				<img
					onClick={handleMode}
					src={modeImg}
					alt="mode toggle"
					style={{
						filter:
							mode === "dark" ? "invert(100%)" : "invert(20%)",
					}}
					width="50"
					height="50"
				/>
			</div>
		</div>
	);
};

export default ThemeSelector;

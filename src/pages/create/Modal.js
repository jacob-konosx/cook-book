import React, { useEffect } from "react";
import "./Create.js";
const Modal = ({ modalContent, closeModal }) => {
	useEffect(() => {
		setTimeout(() => {
			closeModal();
		}, 3000);
	});
	return (
		<div className="modal">
			<p>{modalContent}</p>
		</div>
	);
};

export default Modal;

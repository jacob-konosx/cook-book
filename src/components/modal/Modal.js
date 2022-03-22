import React, { useEffect } from "react";
import "./Modal.css";
const Modal = ({ modalContent, closeModal }) => {
	useEffect(() => {
		setTimeout(() => {
			closeModal();
		}, 5000);
	});
	return (
		<div className="modal">
			<p>{modalContent}</p>
		</div>
	);
};

export default Modal;

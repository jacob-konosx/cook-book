export const ModalReducer = (state, action) => {
	if (action.type === "NO_LOGIN") {
		return {
			...state,
			isOpen: true,
			content: "Login first to create recipe!",
		};
	}
	if (action.type === "CLOSE_MODAL") {
		return { ...state, isOpen: false };
	}

	throw new Error("no matching action type");
};

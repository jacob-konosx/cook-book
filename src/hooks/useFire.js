import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../utils/firebase";

const useFire = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const db = getFirestore(app);
			const recipesCollectionRef = collection(db, "recipes");
			setLoading(true);
			try {
				const data = await getDocs(recipesCollectionRef);

				const recipes = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setData(recipes);
				setError(false);
				setLoading(false);
			} catch (error) {
				setError(error);
				console.log(error);
				if (error.name === "AbortError") {
					console.log("Fetch aborted!");
				} else {
					setLoading(false);
					setError("Could not fetch the data.");
				}
			}
		};
		getData();
	}, []);
	return { loading, data, error };
};

export default useFire;

import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState(null);

	const postData = (postData) => {
		setOptions({
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(postData),
		});
	};
	useEffect(() => {
		const controller = new AbortController();
		const getData = async (fetchOptions) => {
			setLoading(true);
			try {
				const response = await fetch(url, {
					...fetchOptions,
					signal: controller.signal,
				});
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data = await response.json();
				setData(data);
				setError(false);
				setLoading(false);
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("Fetch aborted!");
				} else {
					setLoading(false);
					setError("Could not fetch the data.");
				}
			}
		};
		if (method === "GET") {
			getData();
		}
		if (method === "POST" && options) {
			getData(options);
		}
		return () => {
			controller.abort();
		};
	}, [url, method, options]);
	return { loading, data, error, postData };
};

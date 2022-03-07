import { initializeApp } from "firebase/app";
const firebaseConfig = {
	apiKey: "AIzaSyAYlyjMG6k2AZ8OS15Rysx7wiZIeiFXrOo",
	authDomain: "cook-book-ef205.firebaseapp.com",
	projectId: "cook-book-ef205",
	storageBucket: "cook-book-ef205.appspot.com",
	messagingSenderId: "463318482360",
	appId: "1:463318482360:web:3ed7d58594755f36fb234d",
	measurementId: "G-Z0M92P7CCT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

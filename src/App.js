import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { createApiUrl } from "./utils";
import Header from "./components/Header";
import Gallery from "./components/Gallery";

function App() {
	const [images, setImages] = useState([]);
	const fetchImages = useCallback(async () => {
		const response = await axios.get(createApiUrl("images/search"), {
			params: {
				limit: 15,
			},
		});
		setImages(response.data);
	}, []);

	// const fetchFavorites = useCallback(async () => {
	// 	const response = await axios.get(createApiUrl("favorites"));
	// 	setImages(response.data);
	// }, [fetchImages]);

	// const addToFavorite = useCallback(async (imageId) => {
	// 	const response = await axios.post(createApiUrl("favorites"), {
	// 		data: {
	// 			imageId: imageId,
	// 		},
	// 	});
	// 	setImages(response.data);
	// }, []);

	// const deleteFromFavorite = useCallback(async (imageId) => {
	// 	const response = await axios.delete(createApiUrl("favorites"), {
	// 		data: {
	// 			image_id: imageId,
	// 		},
	// 	});
	// 	setImages(response.data);
	// }, []);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);
	console.log(images);

	return (
		<div className="App">
			<Header />

			<Gallery images={images} />
			<div className="loading">... загружаем еще котиков ...</div>
		</div>
	);
}

export default App;

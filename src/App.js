import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { createApiUrl } from "./utils";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Loader from "./components/Loader";

function App() {
	const [images, setImages] = useState([]);
	const [favorites, setFavorites] = useState({});
	const [tab, setTab] = useState('all');
	const [loading, setLoading] = useState(true);

	const fetchImages = useCallback(async () => {
		setLoading(true);
		setImages([]);
		const response = await axios.get(createApiUrl("images/search"), {
			params: {
				limit: 25,
			},
		});
		setImages(response.data);
		setLoading(false);
	}, []);

	const fetchMoreImages = useCallback(async () => {
		setLoading(true);
		const response = await axios.get(createApiUrl("images/search"), {
			params: {
				limit: 15,
			}
		})
		setImages(state => [...state, ...response.data]);
		setLoading(false);
	}, []);

	const addToFavorites = useCallback((imageData) => {
		setFavorites((state) => ({ ...state, [imageData.id]: {
			id: imageData.id,
			url: imageData.url,
		} }))
	}, []);

	const removeFromFavorites = useCallback((id) => {
		const newFavorites = { ...favorites };
		delete newFavorites[id];
		setFavorites(newFavorites);
	}, [favorites]);

	useEffect(() => {
		const cachedFavorites = localStorage.getItem('favorites');
		cachedFavorites && setFavorites(JSON.parse(cachedFavorites));
	}, []);

	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);
	
	useEffect(() => {
		fetchImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (tab === 'favorites') {
			return setImages(Object.values(favorites));
		}

		if (!loading) {
			fetchImages();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	const handleScroll = useCallback(() => {
		if (tab === 'favorites') return;

		const documentHeight = document.body.scrollHeight;
		const currentScroll = window.scrollY + window.innerHeight;
		const modifier = 200;
		if(currentScroll + modifier > documentHeight && !loading) {
			fetchMoreImages();
		}
	}, [fetchMoreImages, loading, tab]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, [handleScroll]);

	return (
		<div className="App">
			<Header tab={tab} setTab={setTab}/>
			<Gallery images={images} favorites={favorites} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
			{loading && <Loader />}
		</div>
	);
}

export default App;

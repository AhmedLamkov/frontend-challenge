import "./Gallery.css";
import PostImage from "../PostImage";

const Gallery = ({ images, favorites, addToFavorites, removeFromFavorites }) => {
	return (
		<div className="gallery">
			{images?.map((image) => (
				<PostImage key={image.id} data={image} isInFavorites={favorites[image.id]} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites}/>
			))}
		</div>
	);
};

export default Gallery;

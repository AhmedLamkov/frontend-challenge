import "./Gallery.css";
import PostImage from "../PostImage";

const Gallery = (props) => {
	return (
		<div className="gallery">
			{props.images.map((image) => (
				<PostImage url={image.url} />
			))}
		</div>
	);
};

export default Gallery;

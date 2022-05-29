import React from "react";
import "./PostImage.css";
import { ReactComponent as FavoriteBorder } from "../../img/favorite_border.svg";
import { ReactComponent as FavoriteFilled } from "../../img/favorite_filled.svg";

const PostImage = (props) => {
	return (
		<div className="post">
			<div
				style={{ backgroundImage: `url(${props.url})` }}
				className="post_content"
			/>
			<div className="post_favorite" />
		</div>
	);
};
export default PostImage;

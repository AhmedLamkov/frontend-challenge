import React, { useCallback } from "react";
import classnames from "classnames";
import "./PostImage.css";

const PostImage = ({ data, isInFavorites, addToFavorites, removeFromFavorites }) => {
	const handleClick = useCallback(() => {
		if (isInFavorites) {
			return removeFromFavorites(data.id);
		}

		return addToFavorites(data);
	}, [addToFavorites, data, isInFavorites, removeFromFavorites]);


	return (
		<div className="post">
			<div
				style={{ backgroundImage: `url(${data.url})` }}
				className="post_content"
			/>
			<div className={classnames('post_favorite', { 'post_favorite--saved': isInFavorites })} onClick={handleClick}/>
		</div>
	);
};
export default PostImage;

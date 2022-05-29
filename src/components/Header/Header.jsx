import { useCallback } from "react";
import classnames from "classnames";
import "./Header.css";

const links = [
	{ value: 'all', text: 'Все котики' },
	{ value: 'favorites', text: 'Любимые котики' }
]

const Header = ({ tab, setTab }) => {
	const handleClick = useCallback((event) => {
		setTab(event.target.value);
	}, [setTab]);
	return (
		<header className="header">
			<div className="header_nav">
				{links.map((link, id) => (
					<button className={classnames('header_link', { 'header_link--active': tab === link.value })} value={link.value} key={id} onClick={handleClick}>
						{link.text}
					</button>
				))}
			</div>
		</header>
	);
};

export default Header;

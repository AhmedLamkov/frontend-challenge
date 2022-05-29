import "./Header.css";

const Header = () => {
	return (
		<header className="header">
			<div className="header_nav">
				<a className="header_link" href="/">
					Все котики
				</a>
				<a className="header_link" href="/favorites">
					Любимые котики
				</a>
			</div>
		</header>
	);
};

export default Header;

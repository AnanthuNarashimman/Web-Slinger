function Header() {
    return (
        <header className="header">
            <div className="logo">MGR</div>
            <nav className="nav">
                <a href="#" className="nav-link">Home</a>
                <a href="#" className="nav-link">About</a>
                <a href="#" className="nav-link">Works</a>
                <button className="contact-btn">
                    Contact
                    <span className="arrow-icon">→</span>
                </button>
            </nav>
        </header>
    )
}

export default Header

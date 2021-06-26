import { useState } from 'react';

export default function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark d-flex justify-content-end p-3">
            <a className="navbar-brand text-white" href="/">
                Buddies
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={handleNavCollapse}
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div
                className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link text-white" href="/home">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/users">
                            Users
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link text-white" href="/profile">
                            My Profile
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

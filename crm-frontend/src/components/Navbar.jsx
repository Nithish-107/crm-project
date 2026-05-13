import "../css/Navbar.css";
import {
    Search,
    Bell,
    Calendar,
    Settings,
    Plus
} from "lucide-react";

function Navbar() {

    const userName =
        localStorage.getItem("userName");

    const role =
        localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem(
            "isLoggedIn"
        );

        localStorage.removeItem(
            "role"
        );

        localStorage.removeItem(
            "userName"
        );

        window.location.href = "/";
    };

    return (

        <div className="navbar">

            <div className="nav-left">

                <h2>
                    Home
                </h2>

            </div>


            <div className="nav-center">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search records"
                    />

                </div>

            </div>


            <div className="nav-right">

                <button className="icon-btn">
                    <Plus size={18} />
                </button>

                <button className="icon-btn">
                    <Bell size={18} />
                </button>

                <button className="icon-btn">
                    <Calendar size={18} />
                </button>

                <button className="icon-btn">
                    <Settings size={18} />
                </button>


                <div className="profile-box">

                    <div className="profile-circle">
                        {userName?.charAt(0)}
                    </div>

                    <div className="profile-info">

                        <h4>
                            {userName}
                        </h4>

                        <p>
                            {role}
                        </p>

                    </div>

                </div>


                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Navbar;
import { useState, useRef, useEffect } from "react";

import "../css/Navbar.css";

import {
    Search,
    Bell,
    Calendar,
    Settings,
    Plus,
    X
} from "lucide-react";

function Navbar() {

    const [showProfile, setShowProfile] =
        useState(false);

    const profileRef = useRef();

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

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target
                )
            ) {
                setShowProfile(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (

        <div className="navbar">

            <div className="nav-left">

                <h2>Home</h2>

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

                {/* Profile */}
                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >

                    <div
                        className="profile-box"
                        onClick={() =>
                            setShowProfile(
                                !showProfile
                            )
                        }
                    >

                        <div className="profile-circle">
                            {userName?.charAt(0)}
                        </div>

                        <div className="profile-info">

                            <h4>{userName}</h4>

                            <p>{role}</p>

                        </div>

                    </div>

                    {showProfile && (

                        <div className="profile-popup">

                            <div className="popup-header">

                                <div className="popup-user">

                                    <div className="popup-circle">
                                        {userName?.charAt(0)}
                                    </div>

                                    <div>

                                        <h3>
                                            {userName}
                                        </h3>

                                        <p>
                                            {role}
                                        </p>

                                    </div>

                                </div>

                                <button
                                    className="close-btn"
                                    onClick={() =>
                                        setShowProfile(
                                            false
                                        )
                                    }
                                >
                                    <X size={18} />
                                </button>

                            </div>

                            <div className="popup-body">

                                <button className="popup-item">
                                    My Profile
                                </button>

                                <button className="popup-item">
                                    Settings
                                </button>

                                <button className="popup-item">
                                    Notifications
                                </button>

                                <button
                                    className="popup-logout"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Navbar;
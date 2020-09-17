import React, {useEffect, useState} from "react";
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener("scroll");
        };

    }, []);

    return (
            <div className={`nav ${show && "nav_black"}`}>
                <img
                    className="nav_logo"
                    src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-7fdc7.appspot.com/o/pngfuel.com.png?alt=media&token=3e5a896e-a9da-4a16-b83d-a7ceab174b4a"
                    alt="Netflix logo"
                />

                <img
                    className="nav_avatar"
                    src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-7fdc7.appspot.com/o/0ddccae723d85a703b798a5e682c23c1.png?alt=media&token=35889a28-e710-470d-a6d3-ccf2276fdb60"
                    alt="avatar"
                />
            </div>
    )
}

export default Nav;
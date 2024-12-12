import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const dropdownToggleHandler = () => {
    setDropdownOpen((p) => !p);
  };

  const onLogout = async () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__content__logo">
          <img src="uploads/app/logo.svg" alt="Blood Link" style={{ width: "200px", height: "50px" }} />
        </Link>
        <nav
          className={`${"header__content__nav"} 
          ${menuOpen && size.width < 768 ? `${"isMenu"}` : ""} 
          }`}
        >
          <ul>
            <li>
              <Link to="/Homepage2">Home</Link>
            </li>
            <li>
              <Link to="/ViewBloodInventory">Blood Inventory</Link>
            </li>
            <li>
              <Link to="/RequestBlood">Request Blood</Link>
            </li>
            <li>
              <Link to="/RequestBloodInfo">Requested Blood</Link>
            </li>
            <li>
              <Link to="/BookAppointment">Book Appointment</Link>
            </li>
            <li>
              <Link to="/Questions">Check Eligiblity</Link>
            </li>
            <li>
              <Link to="/Profile">Update Profile</Link>
            </li>

              <button onClick={onLogout} className="btn btn__login">Logout</button>
          </ul>
        </nav>
        <div className="header__content__toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} style={{ color:"black"}} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
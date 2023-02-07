//the Header renders the logo and Navbar content

import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import logo from "../../graphics/Logo.svg";

export default function Header() {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className='logo'>
            <img src={logo} alt="Track Overview logo" width={"50px"} />
            <div>
              <h3>Track <br />Overview </h3>
            </div>
        </Link>
        <Navbar />
      </div>
    </header>
  );
};
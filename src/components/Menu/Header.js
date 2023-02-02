//the Header renders the logo and Navbar content

import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className='logo'>
            Logo
        </Link>
        <Navbar />
      </div>
    </header>
  );
};
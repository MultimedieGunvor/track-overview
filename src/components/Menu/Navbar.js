// the Navbar renders the MenuItems component

import { menuItems } from '../../menuItems';
import MenuItems from './MenuItems';

const Navbar = () => {
    return (
      <nav>
        <ul className="menus">
          {/* looping through menuItems and rendering them */}
          {menuItems.map((menu, index) => {
            return <MenuItems items={menu} key={index} />;
          })}
        </ul>
      </nav>
    );
};
  
export default Navbar;
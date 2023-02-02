// the Dropdown renders menu items

// accessing the "submenus" and "dropdown" prop so we can render them
const Dropdown = ({ submenus, dropdown }) => {
    return (
      // using the "dropdown" prop to dynamically add a class name when a dropdown is clicked
      // the "show" class name is added when a dropdown is activated
      <ul className={`dropdown ${dropdown ? "show" : ""}`}>
        {submenus.map((submenu, index) => (
          <li key={index} className="menu-items">
            <a href={submenu.url}>{submenu.title}</a>
          </li>
        ))}
      </ul>
    );
  };
  
export default Dropdown;
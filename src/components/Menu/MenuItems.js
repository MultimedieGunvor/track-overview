// the MenuItems renders individual items and the dropdown

import Dropdown from "./Dropdown";
import { useState,useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

// receiving the menu items data via the items prop
const MenuItems = ({ items }) => {
    // defining a state variable called "dropdown" with a default value of "false"
    // & a "setDropdown" updater to toggle the state when the dropdown button is clicked
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    // in the "useEffect" hook, we check if a dropdown is open and then check if
    // the DOM node that is being clicked is outside of the dropdown, then
    // we close the dropdown
    useEffect(() => {
        const handler = (event) => {
         if (dropdown && ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
         }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);


    // the "onMouseEnter" event handler is invoked when the mouse pointer moves onto a menu item.
    // from there, we check if the interior width of the window is greater than 960px,
    // then we open the dropdown
    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    // whenever the mouse leaves the menu item, we invoke the "onMouseLeave" event handler
    // which then closes the dropdown
    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    // we add a click event to invoke a function to set the "dropdown" state back to the default "false" value
    const closeDropdown = () => {
      dropdown && setDropdown(false);
    };

    const location = useLocation();


    return (

      // we use the "useRef" to access the DOM elements of the dropdown by passing a reference object to the target node
      <li className="menu-items" ref={ref}
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
        onClick={closeDropdown}
      >
        {items.submenu ? (

          // --- Trying to apply className to Wagon button when one of the wagon submenus is the active location. So far doesn't work.
          // location.pathname === items.url ?
          // <>
          //   <button type="button" aria-haspopup="menu" 
          //   aria-expanded={dropdown ? "true" : "false"} 
          //   onClick={() => setDropdown((prev) => !prev)}
          //   className="active-tab"
          //   >
          //     <img src={items.icon} alt={items.title}/>
          //     {items.title}{' '}
          //   </button>
          //   <Dropdown submenus={items.submenu} dropdown={dropdown} />
          // </>
          // : 
          <>
          {/* using the button element to open the dropdown menu */}
          <button type="button" aria-haspopup="menu" 
          // the "aria-expanded" attribute indicates if a dropdown box is expanded or collapsed
          aria-expanded={dropdown ? "true" : "false"} 
          onClick={() => setDropdown((prev) => !prev)}
          >
            <img src={items.icon} alt={items.title}/>
            {items.title}{' '}
          </button>
          {/* passing the "submenu" items via the prop so they can be accessed by Dropdown*/}
          {/* passing the "dropdown" variable to the "Dropdown" component as a prop so we can handle the dropdown toggle */}
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </>
        ) : (
          location.pathname === items.url ?
          <Link to={items.url} className="active-tab">
            <img src={items.icon} alt={items.title} />
            {items.title}</Link> :
            <Link to={items.url}>
            <img src={items.icon} alt={items.title} />
            {items.title}</Link>
        )}
      </li>
    );
  };
  
export default MenuItems;
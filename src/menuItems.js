import station from "../src/graphics/Station.svg";
import booking from "../src/graphics/Booking.svg";
import train from "../src/graphics/Train2.svg";
import util from "../src/graphics/Util.svg";
import help from "../src/graphics/Help.svg";
import user from "../src/graphics/User.svg";
import wagon from "../src/graphics/Wagon.svg";

export const menuItems = [
  {
    title: 'Station',
    url: '/',
    icon: station,
  },
  {
    title: 'Booking',
    url: '/booking',
    icon: booking,
  },
  {
    title: 'Train',
    url: '/train',
    icon: train,
  },
  {
    title: 'Wagon',
    url: '/wagon',
    icon: wagon,
    submenu: [
      {
        title: 'Show Wagon',
        url: 'show-wagon',
      },
      {
        title: 'Show Wagon Trace',
        url: 'show-wagon-trace',
      },
      {
        title: 'Show Transport Booking',
        url: 'show-transport-booking',
      },
    ],
  },
  {
    title: 'Util',
    url: '/util',
    icon: util,
  },
  {
    title: 'Help',
    url: '/help',
    icon: help,
  },
  {
    title: 'User',
    url: '/user',
    icon: user,
  },
];
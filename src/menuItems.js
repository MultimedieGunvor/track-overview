export const menuItems = [
  {
    title: 'Station',
    url: '/',
  },
  {
    title: 'Booking',
    url: '/booking',
  },
  {
    title: 'Train',
    url: '/train',
  },
  {
      title: 'Wagon',
      url: '/wagon',
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
  },
  {
    title: 'Help',
    url: '/help',
  },
  {
    title: 'User',
    url: '/user',
  },
];
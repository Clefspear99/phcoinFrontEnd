/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/user',
    name: 'Profile',
    view: 'UserProfile'
  },
  {
    path: '/login',
    name: 'Login',
    view: 'LogIn'
  },
  {
    path: '/Signup',
    name: 'Signup',
    view: 'signUp'
  },
  {
    path: '/viewer',
    name: 'viewer',
    view: 'viewer'
  },
  {
    path: '/vuer',
    name: 'temp',
    view:'viewer'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]

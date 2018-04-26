import IndexPage from "views/Index/Index.jsx";
import UserProfilePage from "views/User/Profile.jsx";
import UserReactPage from "views/User/ReactUser.jsx";
import UserListPage from "views/User/Lists.jsx";
import DeviceListPage from "views/Device/List.jsx"
// @material-ui/icons
import { Dashboard, PermIdentity } from "@material-ui/icons"

const appRoutes = [
  {
    path: "/home",
    name: "Home Page",
    navbarName: "IOT Home Page",
    icon: Dashboard,
    component: IndexPage
  },
  {
    collapse: true,
    state: "openUsers",
    path: "/users",
    name: "Users",
    navbarName: "IOT Users",
    icon: PermIdentity,
    views: [
      /* {
        path: "/users/list",
        name: "User List",
        navbarName: "User List",
        mini: "UL",
        component: UserListPage
      }, */
      {
        path: "/users/react",
        name: "User List",
        navbarName: "User List",
        mini: "UP",
        component: UserReactPage
      },
      {
        path: "/users/profile",
        name: "User Profile",
        navbarName: "User Profile",
        mini: "UP",
        component: UserProfilePage
      }
    ]
  },
  {
    path: "/devices",
    name: "Devices",
    navbarName: "IOT Devices",
    icon: PermIdentity,
    component: DeviceListPage
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home"
  }
]

export default appRoutes;
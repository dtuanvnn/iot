import IndexPage from "views/Index/Index.jsx";
import UserProfilePage from "views/User/Profile.jsx";
import UserReactPage from "views/User/ReactUser.jsx";
import UserListPage from "views/User/Lists.jsx";

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
    path: "/profile",
    name: "User Profile",
    navbarName: "IOT User Profile",
    icon: PermIdentity,
    component: UserProfilePage
  },
  {
    collapse: true,
    state: "openUsers",
    path: "/users",
    name: "Users",
    navbarName: "IOT Users",
    icon: PermIdentity,
    views: [
      {
        path: "/users/list",
        name: "User List",
        navbarName: "User List",
        mini: "UL",
        component: UserListPage
      },
      {
        path: "/users/react",
        name: "User React Table",
        navbarName: "User React Table",
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
    redirect: true,
    path: "/",
    pathTo: "/home"
  }
]

export default appRoutes;
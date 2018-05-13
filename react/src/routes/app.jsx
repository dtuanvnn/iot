import IndexPage from "views/Index/Index.jsx";
import NotificationHistory from "views/Notifications/History.jsx";
import SensorHistory from "views/Sensors/History.jsx";
import SensorChart from "views/Sensors/Chart.jsx";
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
    path: "/users",
    name: "User List",
    navbarName: "User List",
    icon: PermIdentity,
    component: UserReactPage
  },
  /* {
    collapse: true,
    state: "openUsers",
    path: "/users",
    name: "Users",
    navbarName: "IOT Users",
    icon: PermIdentity,
    views: [
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
  }, */
  {
    path: "/devices",
    name: "Devices",
    navbarName: "IOT Devices",
    icon: PermIdentity,
    component: DeviceListPage
  },
  {
    path: "/notifications",
    name: "Notification History",
    navbarName: "Notification History",
    icon: PermIdentity,
    component: NotificationHistory
  },
  {
    collapse: true,
    state: "openUsers",
    path: "/sensors",
    name: "Sensor History",
    navbarName: "Sensor  History",
    icon: PermIdentity,
    views: [
      {
        path: "/sensors/history",
        name: "Sensor History Table",
        navbarName: "Sensor History Table",
        mini: "SHT",
        component: SensorHistory
      },
      {
        path: "/sensors/chart",
        name: "Sensor History Chart",
        navbarName: "Sensor History Chart",
        mini: "SHC",
        component: SensorChart
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
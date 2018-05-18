import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import cx from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from "material-ui";

import { HeaderLinks } from "components";

import sidebarStyle from "assets/jss/material-dashboard-react/sidebarStyle.jsx";
import avatar from "assets/img/faces/marc.jpg";

let ps
class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {user}
        {headerLinks}
        {links}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openUsers: this.activeRoute("/users"),
      miniActive: true
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  openCollapse(collapse) {
    var st = {};
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  render() {
    const { classes, color, logo, image, logoText, routes, bgColor, isAdmin, username } = this.props;
    const itemText =
      classes.itemText +
      " " +
      cx({
        [classes.itemTextMini]: this.props.miniActive && this.state.miniActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive
      });
    const userWrapperClass = classes.user
    const caret = classes.caret
    const collapseItemMini = classes.collapseItemMini
    var user = (
      <div className={userWrapperClass}>
        <div className={classes.photo}>
          <img src={avatar} className={classes.avatarImg} alt="..." />
        </div>
        <List className={classes.list}>
          <ListItem className={classes.item + " " + classes.userItem}>
            <NavLink
              to={"#"}
              className={classes.itemLink + " " + classes.userCollapseButton}
              onClick={() => this.openCollapse("openAvatar")}
            >
              <ListItemText
                primary={username}
                secondary={
                  <b
                    className={
                      caret + " " + classes.userCaret +
                      " " +
                      (this.state.openAvatar ? classes.caretActive : "")
                    }
                  />
                }
                disableTypography={true}
                className={itemText + " " + classes.userItemText}
              />
            </NavLink>
            <Collapse in={this.state.openAvatar} unmountOnExit>
              <List className={classes.list + " " + classes.collapseList}>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="/profile"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {"MP"}
                    </span>
                    <ListItemText
                      primary={"My Profile"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {"EP"}
                    </span>
                    <ListItemText
                      primary={
                        "Edit Profile"
                      }
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
                <ListItem className={classes.collapseItem}>
                  <NavLink
                    to="#"
                    className={
                      classes.itemLink + " " + classes.userCollapseLinks
                    }
                  >
                    <span className={collapseItemMini}>
                      {"S"}
                    </span>
                    <ListItemText
                      primary={"Settings"}
                      disableTypography={true}
                      className={collapseItemText}
                    />
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
        </List>
      </div>
    )
    var links = (isAdmin ? 
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.redirect) return null;
          if (prop.hidden) return null;
          if (prop.collapse) {
            const navLinkClasses =
              classes.itemLink +
              " " +
              cx({
                [" " + classes.collapseActive]: this.activeRoute(prop.path)
              });
            const itemText =
              classes.itemText +
              " " +
              cx({
                [classes.itemTextMini]:
                  this.props.miniActive && this.state.miniActive
              });
            const collapseItemText =
              classes.collapseItemText +
              " " +
              cx({
                [classes.collapseItemTextMini]:
                  this.props.miniActive && this.state.miniActive
              });
            const itemIcon = classes.itemIcon
            const caret = classes.caret
            return (
              <ListItem key={key} className={classes.item}>
                <NavLink
                  to={"#"}
                  className={navLinkClasses}
                  onClick={() => this.openCollapse(prop.state)}
                >
                  <ListItemIcon className={itemIcon}>
                    <prop.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={prop.name}
                    secondary={
                      <b
                        className={
                          caret +
                          " " +
                          (this.state[prop.state] ? classes.caretActive : "")
                        }
                      />
                    }
                    disableTypography={true}
                    className={itemText}
                  />
                </NavLink>
                <Collapse in={this.state[prop.state]} unmountOnExit>
                  <List className={classes.list + " " + classes.collapseList}>
                    {prop.views.map((prop, key) => {
                      if (prop.redirect) {
                        return null;
                      }
                      const navLinkClasses =
                        classes.collapseItemLink +
                        " " +
                        cx({
                          [" " + classes[color]]: this.activeRoute(prop.path)
                        });
                      const collapseItemMini = classes.collapseItemMini
                      return (
                        <ListItem key={key} className={classes.collapseItem}>
                          <NavLink to={prop.path} className={navLinkClasses}>
                            <span className={collapseItemMini}>
                              {prop.mini}
                            </span>
                            <ListItemText
                              primary={prop.name}
                              disableTypography={true}
                              className={collapseItemText}
                            />
                          </NavLink>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </ListItem>
            );
          }
          const listItemClasses = cx({
            [" " + classes[color]]: this.activeRoute(prop.path)
          });
          const whiteFontClasses = cx({
            [" " + classes.whiteFont]: this.activeRoute(prop.path)
          });
          const navLinkClasses =
            classes.itemLink +
            " " +
            cx({
              [" " + classes[color]]: this.activeRoute(prop.path)
            });
          const itemText =
            classes.itemText +
            " " +
            cx({
              [classes.itemTextMini]:
                this.props.miniActive && this.state.miniActive
            });
          const itemIcon = classes.itemIcon
          return (
            <ListItem key={key} className={classes.item}>
              <NavLink to={prop.path} className={navLinkClasses}>
                <ListItemIcon className={itemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.name}
                  disableTypography={true}
                  className={itemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List> : undefined
    );
    const logoNormal =
      classes.logoNormal +
      " " +
      cx({
        [classes.logoNormalSidebarMini]:
          this.props.miniActive && this.state.miniActive
      });
    const logoMini =classes.logoMini
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <div className={logoClasses}>
        <a href="http://www.google.com" className={logoMini}>
          <img src={logo} alt="logo" className={classes.img} />
        </a>
        <a href="http://www.google.com" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              headerLinks={<HeaderLinks />}
              user={user}
              links={links}
            />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              user={user}
              links={links}
            />
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf(["white", "red", "orange", "green", "blue", "purple", "rose"]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  isAdmin: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { loggedIn } = state
  return {
      isAdmin: loggedIn.admin > 0,
      username: loggedIn.username
  };
};

export default connect(mapStateToProps)(withStyles(sidebarStyle)(Sidebar));

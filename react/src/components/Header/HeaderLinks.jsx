import React from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import {
  withStyles,
  IconButton,
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
  Tooltip
} from "material-ui";
import { Person, Notifications, Dashboard, Search } from "@material-ui/icons";

import { CustomInput, IconButton as SearchButton } from "components";
import SweetAlert from "react-bootstrap-sweetalert";
import { Redirect } from "react-router-dom"

import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dashboard: false,
      logout: false,
      alert: null
    }
    this.successAlert = this.successAlert.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  }
  handleDashboad = () => {
    this.setState({ dashboard: true });
  }
  handleLogout = () => {
    localStorage.clear()
    this.setState({ logout: true });
  }
  successAlert = () => {
    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="You logged out"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          onConfirm={this.handleLogout}
        >
          Click on the button to redirect to login page.
        </SweetAlert>
      )
    })
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  componentWillMount = () => {
    this.setState({dashboard: false, logout: false})
  }
  render() {
    const { classes } = this.props;
    const { open, dashboard, alert, logout } = this.state;
    if (dashboard) {
      this.setState({dashboard: false})
      return <Redirect to={"/home"} />
    }
    if (logout) {
      this.setState({logout: false})
      return <Redirect to={"/pages/login"} />
    }
    return (
      <div>
        {alert}
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <SearchButton
          color="white"
          aria-label="edit"
          customClass={classes.margin + " " + classes.searchButton}
        >
          <Search className={classes.searchIcon} />
        </SearchButton>
        <Tooltip
          id="tooltip-top"
          title="Dashboard"
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="inherit"
            aria-label="Dashboard"
            className={classes.buttonLink}
            onClick={this.handleDashboad}
          >
            <Dashboard className={classes.links} />
            <Hidden mdUp>
              <p className={classes.linkText}>Dashboard</p>
            </Hidden>
          </IconButton>
        </Tooltip>
        <Manager style={{ display: "inline-block" }}>
          <Target>
            <IconButton
              color="inherit"
              aria-label="Notifications"
              aria-owns={open ? "menu-list" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.buttonLink}
            >
              <Notifications className={classes.links} />
              <span className={classes.notifications}>5</span>
              <Hidden mdUp>
                <p onClick={this.handleClick} className={classes.linkText}>
                  Notification
                </p>
              </Hidden>
            </IconButton>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperResponsive
            }
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Mike John responded to your email
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You have 5 new tasks
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      You're now friend with Andrew
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another Notification
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleClose}
                      className={classes.dropdownItem}
                    >
                      Another One
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
        <Tooltip
          id="tooltip-top"
          title="Logout"
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            color="inherit"
            aria-label="Person"
            className={classes.buttonLink}
            onClick={this.successAlert}
          >
            <Person className={classes.links} />
            <Hidden mdUp>
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);

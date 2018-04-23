import React from "react";
import PropTypes from "prop-types";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { Redirect, Link } from "react-router-dom"
import { withStyles, Select, MenuItem, FormControl, InputLabel } from "material-ui"
// @material-ui/icons
import { Assignment, Dvr, Favorite, Close } from "@material-ui/icons"
// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import ItemGrid from "components/Grid/ItemGrid.jsx"
import IconCard from "components/Cards/IconCard.jsx"
import IconButton from "components/CustomButtons/IconButton.jsx"

import dashboardStyle from "assets/jss/material-dashboard-react/views/extendedFormsStyle.jsx";

import callApi from 'util/apiCaller'

class ReactTables extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      city:[],
      redirect: false,
      simpleSelect: 0
    }
    this.setRedirect = this.setRedirect.bind(this)
    this.selectNode = this.selectNode.bind(this)
  }
  setRedirect = (key) => {
    this.setState({redirect: key})
  }
  handleSimple = () => {

  }
  selectNode = (value, name) => {
    return (
      <MenuItem
        classes={{
          root: this.props.classes.selectMenuItem,
          selected: this.props.classes.selectMenuItemSelected
        }}
        value={value}
      >
        {name}
      </MenuItem>
    )
  }
  componentDidMount() {
    callApi('api/user/filter?id=city').then(res => {
  		this.setState({city: res})
    })
  	callApi('api/user').then(res => {
  		var data = res.map((user,key) => {
        user['actions'] = (
          <div className="actions-right">
            {/* <IconButton
              onClick={this.setRedirect(user._id)}
              color="infoNoBackground"
              customClass="edit">
              <Dvr />
            </IconButton> */}
            <Link to={{ pathname: "profile/", state: { userid: user._id, viewOnly: true} }}>
            <Dvr />
            </Link>
          </div>
        )

        if (user['name'] === undefined) {
          user['name'] = "Abc"
        }
        return user
      })
  		this.setState({users: data})
  	})
  }
  render(){
    const { classes } = this.props;
    const {users, city, redirect, simpleSelect} = this.state
    if (redirect) {
      let url = "/users/" + redirect
      return <Redirect to={url} />
    }
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={Assignment}
            title="User list"
            content={
              <div>
                <ItemGrid xs={12} sm={6} md={5} lg={5}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                  >
                    <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
                      Choose City
                    </InputLabel>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={simpleSelect}
                      onChange={this.handleSimple}
                      inputProps={{
                        name: "simpleSelect",
                        id: "simple-select"
                      }}
                    >
                      <MenuItem disabled classes={{ root: classes.selectMenuItem }} >
                        Choose City
                      </MenuItem>
                      {this.selectNode(1, "Hanoi")}
                    </Select>
                  </FormControl>
                </ItemGrid>
              <ReactTable
                data={users}
                filterable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name",
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "Phone Number",
                    accessor: "phoneNumber"
                  },
                  {
                    Header: "Last Access",
                    accessor: "lastAccess"
                  },
                  {
                    Header: "Action",
                    accessor: "actions",
                    sortable: false,
                    filterable: false,
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
              </div>
            }
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

ReactTables.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ReactTables);



// WEBPACK FOOTER //
// ./src/views/Tables/ReactTables.jsx
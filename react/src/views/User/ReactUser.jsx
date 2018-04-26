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
      cities:[],
      districts:[],
      redirect: false,
      city: "",
      district: ""
    }
    this.setRedirect = this.setRedirect.bind(this)
    this.handleSimple = this.handleSimple.bind(this)
    this.fetchUsers = this.fetchUsers.bind(this)
  }
  setRedirect = (key) => {
    this.setState({redirect: key})
  }
  handleSimple = event => {
    this.setState({[event.target.name]: event.target.value}, () => {
      this.fetchUsers()
    })
  }
  fetchUsers = () => {
    let cityValue =  this.state.city === "" ? "" : this.state.cities[this.state.city]
    let districtValue =  this.state.district === "" ? "" : this.state.districts[this.state.district]
    let params = ""
    params += cityValue
    params += "/" + districtValue
    callApi('api/user/list/' + params).then(res => {
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
  componentDidMount() {
    callApi('api/user/filter?id=city').then(res => {
  		this.setState({cities: res})
    })
    callApi('api/user/filter?id=district').then(res => {
  		this.setState({districts: res})
    })
  	this.fetchUsers()
  }
  render(){
    const { classes } = this.props;
    const {users, cities, districts, redirect, city, district} = this.state
    if (redirect) {
      let url = "api/user/detail" + redirect
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
                <div style={{display: 'flex', 'margin-bottom': '20px'}}>
                <ItemGrid xs={12} sm={6} md={6} lg={3}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel htmlFor="city-select" className={classes.selectLabel}>
                      Choose City
                    </InputLabel>
                    <Select
                      MenuProps={{className: classes.selectMenu}}
                      classes={{select: classes.select}}
                      value={city}
                      onChange={this.handleSimple}
                      inputProps={{
                        name: "city",
                        id: "city-select"
                      }}
                    >
                      <MenuItem classes={{ root: classes.selectMenuItem }} value={""}>
                        None
                      </MenuItem>
                      {cities.map((name, index) =>
                        <MenuItem
                          classes={{
                            root: this.props.classes.selectMenuItem,
                            selected: this.props.classes.selectMenuItemSelected
                          }}
                          value={index}
                        >{name}
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </ItemGrid>
                <ItemGrid xs={12} sm={6} md={6} lg={3}>
                  <FormControl fullWidth className={classes.selectFormControl}>
                    <InputLabel htmlFor="district-select" className={classes.selectLabel}>
                      Choose District
                    </InputLabel>
                    <Select
                      MenuProps={{className: classes.selectMenu}}
                      classes={{select: classes.select}}
                      value={district}
                      onChange={this.handleSimple}
                      inputProps={{
                        name: "district",
                        id: "district-select"
                      }}
                    >
                      <MenuItem classes={{ root: classes.selectMenuItem }} value={""}>
                        None
                      </MenuItem>
                      {districts.map((name, index) =>
                        <MenuItem
                          classes={{
                            root: this.props.classes.selectMenuItem,
                            selected: this.props.classes.selectMenuItemSelected
                          }}
                          value={index}
                        >{name}
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </ItemGrid>
                </div>
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
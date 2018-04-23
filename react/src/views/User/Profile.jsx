import React from "react";
import { Grid, InputLabel } from "material-ui";
import { Redirect, Link } from "react-router-dom"
import callApi from 'util/apiCaller'

import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: undefined,
      user: [],
      viewOnly: false,
      redirect: false
    }
    this.handleViewDevices = this.handleViewDevices.bind(this)
  }
  handleViewDevices = (key) => {
    this.setState({redirect: key})
  }
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.viewOnly) {
      this.setState({viewOnly: this.props.location.state.viewOnly})
    }
    let id = undefined
    if (this.props.location.state && this.props.location.state.userid) {
      id = this.props.location.state.userid
    } else {
      id = localStorage.getItem('userid')
    }
    this.setState({userid: id})
  	callApi('api/user/detail?id=' + id).then(res => {
  		this.setState({user: res})
    })
  }
  render() {
    const {user, viewOnly, redirect, userid} = this.state
    const cartTitle = (viewOnly ? "View" : "Edit") + " Profile"
    /* if (redirect) {
      let url = "/devices/" + redirect
      return <Redirect to={url} />
    } */
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle={cartTitle}
              cardSubtitle="Complete your profile"
              content={
                <div>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText={user.name}
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText={user.email}
                        id="email-address"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText={user.lastAccess}
                        id="first-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText={user.phoneNumber}
                        id="phoneNumber"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText={user.city}
                        id="city"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText={user.district}
                        id="country"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText={user.ward}
                        id="postal-code"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </ItemGrid>
                  </Grid>
                  {/* <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        About me
                      </InputLabel>
                      <CustomInput
                        labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5
                        }}
                      />
                    </ItemGrid>
                  </Grid> */}
                </div>
              }
              footer={
                <div>
                  {viewOnly ? null : <Button color="primary">Update Profile</Button>}
                  <Link to={{ pathname: "/devices", state: { userid: userid}}}>
                  <Button color="primary">View devices</Button>
                  </Link>
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default Profile;

import React from "react";
import { Grid, InputLabel, FormLabel } from "material-ui";
import { Redirect, Link } from "react-router-dom"
import callApi from 'util/apiCaller'
import axios from 'axios'

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
      redirect: ""
    }
  }
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.viewOnly) {
      this.setState({viewOnly: this.props.location.state.viewOnly})
    }
    let id = undefined
    if (this.props.location.state && this.props.location.state.userid) {
      id = this.props.location.state.userid
    } else {
      id = localStorage.getItem('userId')
    }
    this.setState({userid: id})
    this.setState({redirect: ""})
  	callApi('api/user/detail?id=' + id).then(res => {
      /* if (!res.ok) {
        this.setState({redirect: "/pages/login"})
        return
      } */
  		this.setState({user: res})
    })
    /* var token = 'Bearer ' + localStorage.getItem('token')
    axios.get('http://localhost:3001/api/user/detail?id=' + id, { headers: { Authorization: token } })
    .then(function(res){
      console.log(res)
    })
    .catch(function (err) {
      console.log(err)
    }) */
  }
  render() {
    const {user, viewOnly, redirect, userid} = this.state
    const cartTitle = (viewOnly ? "View" : "Edit") + " Profile"
    if (redirect !== "") {
      // let url = "/devices/" + redirect
      return <Redirect to={redirect} />
    }
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle={cartTitle}
              cardSubtitle="Complete your profile"
              content={
                <form>
                  <Grid container>
                    <ItemGrid xs={12} sm={2} md={3}>
                      <FormLabel /* className={classes.labelHorizontal} */>
                        Required Text
                      </FormLabel>
                    </ItemGrid>
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
                </form>
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

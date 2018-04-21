import React, { PropTypes, Component } from 'react';

import UserList from "views/User/UserList";
import callApi from 'util/apiCaller'

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
  	callApi('api/user').then(res => {
  		var data = res.map(user => Object.keys(user).map(function(key) {
        return user[key]
      }))
      var users = data.map(val => val.shift())
  		this.setState({users: data})
  	})
  }
  
  render() {
  	const {users} = this.state
    return (
    	<UserList users={users} />
    )
	}
}

export default Lists;
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
  	callApi('users/api').then(response => {
  		var data = response.map(user => Object.keys(user).map(function(key) {
  			return user[key]
  		}))
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
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class About extends Component {
  state = {
    redirect: false
  }
  componentDidMount () {
    var token = 'Bearer ' + localStorage.getItem('token');
    var header  = { 
      'headers': { 
        'Authorization': token
      }
    }
    axios.get('http://localhost:3001/users/islogged', header)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      //localStorage.removeItem('token')
      //this.setState({ redirect: true })
    })
  }

  render () {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to='/login'/>
    }
    return 'About'
  }
}

export default About
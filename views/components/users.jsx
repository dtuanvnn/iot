import React, { Compoment } from 'react'

export default class Users extends Compoment {
  constructor() {
    super()
    this.state = {users: []};
  }

  getUsers() {
    getUsersData().then((users) => {
      this.setState({users})
    })
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {
    const users = this.state

    return (
      <div>
        { users.map((user, index) => (
          <div className="col-sm-6" key={index}>
            <div className="panel panel-danger">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <span className="btn">#{user.name}</span>
                </h3>
              </div>
              <div className="panel-body">
                <p>{ user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
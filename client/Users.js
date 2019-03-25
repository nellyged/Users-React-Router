import React, { Component } from 'react';
import axios from 'axios';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.loadUsers();
    const { location, id } = this.props;
    if (id) {
      this.props.setPage(id);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.count !== this.props.count) {
      this.loadUsers();
    }
  }
  loadUsers() {
    axios
      .get(`https://acme-users-api.herokuapp.com/api/users/${this.props.id}`)
      .then(response => response.data)
      .then(({ users }) => {
        this.setState({ users });
      });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>First</th>
              <th>Middle</th>
              <th>Last</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.middleName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

import React, { Component } from 'react';
import axios from 'axios';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.loadUsers = this.loadUsers.bind(this);
    //On the initial load we wont get the props, its in the update that we finally get them
  }
  componentDidMount() {
    this.loadUsers();
  }
  loadUsers() {
    axios
      .get(`https://acme-users-api.herokuapp.com/api/users/${this.props.id}`)
      .then(response => response.data)
      .then(({ users }) => {
        this.setState({ users });
      });
    //Set the count each time we do a load to ensure its at the correct value. this also accounts for hard refresh or if the user enters the id manually
    this.props.setPage(this.props.id);
  }
  componentDidUpdate(prevProps) {
    console.log('Users Component Updated');
    console.log(prevProps);
    console.log(this.props);
    //Check if the id value changed (which is the count) changed. If so we can update this components state by loading the users
    if (prevProps.id !== this.props.id) {
      // console.log('setting state');
      // this.setState({ users: this.props.users });
      //this.props.setPage(this.props.id);
      this.loadUsers();
    }
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

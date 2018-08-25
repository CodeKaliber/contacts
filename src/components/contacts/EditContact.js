import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //======= Start of Checking For Empty Filds =======
    if (!name) {
      this.setState({ name: "Required" });
    }
    if (!email) {
      this.setState({ email: "Required" });
    }
    if (!phone) {
      this.setState({ phone: "Required" });
    }
    //======= End of Checking For Empty Filds =======

    //======= Start If Statement Checking For Input =======
    if (
      name &&
      name !== "Required" &&
      email &&
      email !== "Required" &&
      phone &&
      phone !== "Required"
    ) {
      const updContact = {
        name,
        email,
        phone
      };
      const { id } = this.props.match.params;
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        updContact
      );

      dispatch({ type: "UPDATE_CONTACT", payload: res.data });

      //Clearing Form
      this.setState({
        id: "",
        name: "",
        email: "",
        phone: ""
      });
      this.props.history.push("/");
    }
  }; //======= End If Statement Checking For Input =======

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;

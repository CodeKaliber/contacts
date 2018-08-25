import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

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
      const newContact = {
        name,
        email,
        phone
      };

      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newContact
      );

      dispatch({ type: "ADD_CONTACT", payload: res.data });

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
              <div className="card-header">Add Contact</div>
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
                    value="Add Contact"
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

export default AddContact;

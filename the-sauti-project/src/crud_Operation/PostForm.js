import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { TextField, Button } from "@material-ui/core"

class PostItem extends React.Component {
  constructor() {
    super();

    this.state = {
      item: "",
      description: "",
      location: "",
      price: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);

    axiosWithAuth()
      .post(`/api/users/id/listings`, this.state)
      .then(res => {
        console.log("Post Request", res.data);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { item, description, location, price } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <TextField
            placeholder="item"
            type="text"
            name="item"
            value={item}
            onChange={this.changeHandler}
          />

          <TextField
            placeholder="description"
            type="text"
            name="description"
            value={description}
            onChange={this.changeHandler}
          />

          <TextField
            placeholder="location"
            type="text"
            name="location"
            value={location}
            onChange={this.changeHandler}
          />

          <TextField
            placeholder="Price"
            type="text"
            name="price"
            value={price}
            onChange={this.changeHandler}
          />

          <Button type="submit"> Post </Button>
        </form>
      </div>
    );
  }
}

export default PostItem;

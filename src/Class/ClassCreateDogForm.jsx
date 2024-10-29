import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";

export class ClassCreateDogForm extends Component {
  State = {
    dogName: "",
    dogDescription: "",
    dogImage: "/assets/blue-heeler.png",
    isDisabled: false,
  };

  render() {
    const newDog = {
      image: `${this.State.dogImage}`,
      description: `${this.State.dogDescription}`,
      isFavorite: false,
      name: `${this.State.dogName}`,
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={() => {
          this.setState({ isDisabled: (this.State.isDisabled = true) });
          Requests.postDog(newDog);
          this.setState({ dogName: (this.State.dogName = "") });
          this.setState({ dogDescription: (this.State.dogDescription = "") });
          this.setState({
            dogImage: (this.State.dogImage = "/assets/blue-heeler.png"),
          });
          this.setState({ isDisabled: (this.State.isDisabled = false) });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        {/*  /////////////////////////////////////////////////////////////////  */}
        <input
          type="text"
          value={this.State.dogName}
          onChange={(e) => {
            e.preventDefault();
            this.setState({ dogName: (this.State.dogName = e.target.value) });
          }}
          disabled={this.State.isDisabled}
        />

        {/*  /////////////////////////////////////////////////////////////////  */}
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          value={this.State.dogDescription}
          cols={80}
          rows={10}
          onChange={(e) => {
            this.setState({
              dogDescription: (this.State.dogDescription = e.target.value),
            });
          }}
          disabled={this.State.isDisabled}
        />
        {/*  /////////////////////////////////////////////////////////////////  */}
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => {
            this.setState({ dogImage: (this.State.dogImage = e.target.value) });
          }}
          value={this.State.dogImage}
          disabled={this.State.isDisabled}
        >
          {/*  /////////////////////////////////////////////////////////////////  */}
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={this.State.isDisabled} />
      </form>
    );
  }
}

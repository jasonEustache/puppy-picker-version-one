import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";

export class ClassApp extends Component {
  State = {
    dogs: [],
    favorite: false,
    unfavorited: false,
    createDog: true,
  };

  componentDidMount() {
    Requests.getAllDogs().then((data) => {
      this.setState({ dogs: (this.State.dogs = data) });
    });
  }

  render() {
    const stateSetterFav = (value) => {
      return this.setState({ favorite: (this.State.favorite = value) });
    };
    const stateSetterDog = (value) => {
      return this.setState({ dogs: (this.State.dogs = value) });
    };
    const stateSetterNonFav = (value) => {
      return this.setState({ unfavorited: (this.State.unfavorited = value) });
    };
    const stateSetterCreateDog = (value) => {
      return this.setState({ createDog: (this.State.createDog = value) });
    };
    const stateSetters = [
      stateSetterFav,
      stateSetterNonFav,
      stateSetterCreateDog,
    ];

    const favDogs = this.State.dogs.filter((dog) => {
      if (dog.isFavorite === true) {
        return dog;
      }
    });

    const unFavDog = this.State.dogs.filter((dog) => {
      if (dog.isFavorite === false) {
        return dog;
      }
    });

    const currentSelection = [
      this.State.favorite,
      this.State.unfavorited,
      this.State.createDog,
    ];

    const selection = {
      favorite: this.State.favorite,
      unfavorited: this.State.unfavorited,
      createDog: this.State.createDog,
    };

    const dogLength = {
      favLength: favDogs.length,
      unFavLength: unFavDog.length,
    };

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          objectSelection={selection}
          currentSelection={currentSelection}
          dogLength={dogLength}
          stateSetterTab={stateSetters}
        >
          {selection.favorite ? (
            <ClassDogs dogs={favDogs} stateSetterDog={stateSetterDog} />
          ) : (
            ""
          )}
          {selection.unfavorited ? (
            <ClassDogs dogs={unFavDog} stateSetterDog={stateSetterDog} />
          ) : (
            ""
          )}
          {selection.createDog ? <ClassCreateDogForm /> : ""}
        </ClassSection>
      </div>
    );
  }
}

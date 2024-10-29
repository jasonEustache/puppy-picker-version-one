import { DogCard } from "../Shared/DogCard";
import { Component } from "react";

import toast from "react-hot-toast";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
  State = {
    isLoading: false,
  };

  render() {
    const stateSetterDog = this.props.stateSetterDog;

    return (
      <>
        {this.props.dogs.map((dog, index) => {
          const { description, id, image, isFavorite, name } = dog;
          const newDog = {
            id: `${id}`,
            image: `${image}`,
            description: `${description}`,
            isFavorite: isFavorite,
            name: `${name}`,
          };

          return (
            <DogCard
              dog={newDog}
              key={index}
              onTrashIconClick={() => {
                Requests.deleteDog(id, newDog)
                  .then(() => {
                    this.setState({ isLoading: (this.State.isLoading = true) });
                  })
                  .then(() => {
                    Requests.getAllDogs().then((data) => {
                      stateSetterDog(data);
                    });
                  })
                  .then(() => {
                    this.setState({
                      isLoading: (this.State.isLoading = false),
                    });
                  })
                  .finally(() => {
                    toast.success("clicked trash");
                  });
              }}
              ////////////////////////
              onHeartClick={() => {
                this.setState({ isLoading: (this.State.isLoading = true) });
                Requests.getAllDogs().then((data) => {
                  stateSetterDog(data);
                });
                newDog.isFavorite = false;
                Requests.updateDog(id, newDog);
                Requests.getAllDogs().then((data) => {
                  stateSetterDog(data);
                });
                this.setState({ isLoading: (this.State.isLoading = false) });
                toast.success("clicked heart");
              }}
              ///////////////////////
              onEmptyHeartClick={() => {
                this.setState({ isLoading: (this.State.isLoading = true) });
                Requests.getAllDogs().then((data) => {
                  stateSetterDog(data);
                });
                newDog.isFavorite = true;
                Requests.updateDog(id, newDog);
                Requests.getAllDogs().then((data) => {
                  stateSetterDog(data);
                });
                this.setState({ isLoading: (this.State.isLoading = false) });
                toast.success("clicked empty heart");
              }}
              isLoading={this.State.isLoading}
            />
          );
        })}
      </>
    );
  }
}

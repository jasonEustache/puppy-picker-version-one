import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import toast from "react-hot-toast";

export const FunctionalDogs = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {props.dogs.map((dog, index) => {
        const newDog = {
          id: `${dog.id}`,
          image: `${dog.image}`,
          description: `${dog.description}`,
          isFavorite: dog.isFavorite,
          name: `${dog.name}`,
        };

        return (
          <DogCard
            dog={newDog}
            key={index}
            onTrashIconClick={() => {
              setIsLoading(true);
              Requests.getAllDogs()
                .then((data) => {
                  props.setDogs(data);
                })
                .then(() => {
                  Requests.deleteDog(dog.id, newDog).then(() => {});
                  Requests.getAllDogs().then((data) => {
                    props.setDogs(data);
                  });
                  setIsLoading(false);
                })

                .finally(() => {
                  toast.success("clicked trash");
                });
            }}
            //////////////////
            onHeartClick={() => {
              setIsLoading(true);
              Requests.getAllDogs()
                .then((data) => {
                  props.setDogs(data);
                })
                .then(() => {
                  newDog.isFavorite = false;
                  Requests.updateDog(dog.id, newDog);
                  Requests.getAllDogs().then((data) => {
                    props.setDogs(data);
                  });
                  setIsLoading(false);
                })

                .finally(() => {
                  toast.success("clicked heart");
                });
            }}
            //////////
            onEmptyHeartClick={() => {
              setIsLoading(true);
              Requests.getAllDogs()
                .then((data) => {
                  props.setDogs(data);
                })
                .then(() => {
                  newDog.isFavorite = true;
                  Requests.updateDog(dog.id, newDog);
                  Requests.getAllDogs().then((data) => {
                    props.setDogs(data);
                  });
                  setIsLoading(false);
                })

                .finally(() => {
                  toast.success("clicked empty heart");
                });
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};

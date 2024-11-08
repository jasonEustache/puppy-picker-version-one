import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

// use this as your default selected image
//create a controlled form,  user must select a dog in the data list before typing a name or description
// const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = (props) => {
  const [name, setName] = useState("");
  const [imageName, setImageName] = useState("BlueHeeler");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const image = Object.entries(dogPictures)
    .filter(([label, pictureValue]) => {
      return label === imageName ? pictureValue : "";
    })
    .flat()[1];

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        setDisabled(true);
        Requests.getAllDogs()
          .then((data) => {
            props.setDogs(data);
          })
          .then(() => {
            Requests.postDog({
              name,
              image,
              description,
              isFavorite: false,
            });
            Requests.getAllDogs().then((data) => {
              props.setDogs(data);
            });
            setDisabled(false);
          })

          .finally(() => {
            setName("");
            setImageName("BlueHeeler");
            setDescription("");

            toast.success("good job");
          });
      }}
    >
      <h4> Create a New Dog </h4>

      <label htmlFor="name">Dog Name</label>

      <input
        type="text"
        disabled={disabled}
        value={name}
        onChange={(e) => {
          e.preventDefault();
          setName(e.target.value);
        }}
      />

      <label htmlFor="description"> Dog Description</label>

      <textarea
        name="description"
        id="description"
        cols={80}
        rows={10}
        disabled={disabled}
        value={description}
        onChange={(e) => {
          e.preventDefault();
          setDescription(e.target.value);
        }}
      ></textarea>

      <label htmlFor="picture"> Select an Image </label>

      <select
        id="picture"
        value={imageName}
        onChange={(e) => {
          e.preventDefault();
          setImageName(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={label} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};

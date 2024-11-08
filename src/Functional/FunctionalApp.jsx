import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect } from "react";
import { Requests } from "../api";

export function FunctionalApp() {
  const [favoriteDogStatus, setFavoriteDog] = useState(false);
  const [unfavoriteDogStatus, setUnfavoriteDog] = useState(false);
  const [createDogStatus, SetCreateDog] = useState(false);
  const [defaultDogStatus, setDefaultDog] = useState(true);
  const navBarStatus = [
    favoriteDogStatus,
    unfavoriteDogStatus,
    createDogStatus,
    defaultDogStatus,
  ];
  const navBarStatusSetters = [
    setFavoriteDog,
    setUnfavoriteDog,
    SetCreateDog,
    setDefaultDog,
  ];
  const [allDogs, setDogs] = useState([]);

  const favoriteDogs = allDogs.filter((dog) => {
    return dog.isFavorite ? dog : "";
  });

  const unFavoriteDogs = allDogs.filter((dog) => {
    return !dog.isFavorite ? dog : "";
  });
  const totalFavAndUnFav = {
    favorite: favoriteDogs.length,
    unFavorite: unFavoriteDogs.length,
  };

  useEffect(() => {
    Requests.getAllDogs().then((data) => {
      setDogs(data);
    });
  }, [setDogs]);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        navBarStatus={navBarStatus}
        navBarStatusSetters={navBarStatusSetters}
        totalFavAndUnFav={totalFavAndUnFav}
        setDogs={setDogs}
      >
        {defaultDogStatus ? (
          <FunctionalDogs dogs={allDogs} setDogs={setDogs} />
        ) : (
          ""
        )}
        {favoriteDogStatus ? (
          <FunctionalDogs dogs={favoriteDogs} setDogs={setDogs} />
        ) : (
          ""
        )}
        {unfavoriteDogStatus ? (
          <FunctionalDogs dogs={unFavoriteDogs} setDogs={setDogs} />
        ) : (
          ""
        )}
        {createDogStatus ? <FunctionalCreateDogForm setDogs={setDogs} /> : ""}
      </FunctionalSection>
    </div>
  );
}

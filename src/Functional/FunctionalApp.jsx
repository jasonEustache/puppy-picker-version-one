import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { useEffect } from "react";
import { Requests } from "../api";

export function FunctionalApp() {
  const [favorited, setFavorited] = useState(false);
  const [unfavorited, setUnfavorited] = useState(false);
  const [createDog, SetCreateDog] = useState(true);
  const navBar = [favorited, unfavorited, createDog];
  const navBarSetters = [setFavorited, setUnfavorited, SetCreateDog];
  const [dogs, setDogs] = useState([]);

  const favDog = dogs.filter((dog) => {
    if (dog.isFavorite === true) {
      return dog;
    }
  });
  const dog = dogs.filter((dog) => {
    if (dog.isFavorite === false) {
      return dog;
    }
  });
  const totalFavAndUnFav = { favorite: favDog.length, unFavorite: dog.length };

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
        navBar={navBar}
        navBarSetters={navBarSetters}
        totalFavAndUnFav={totalFavAndUnFav}
        setDogs={setDogs}
      >
        {favorited ? <FunctionalDogs dogs={favDog} setDogs={setDogs} /> : ""}
        {unfavorited ? <FunctionalDogs dogs={dog} setDogs={setDogs} /> : ""}
        {createDog ? <FunctionalCreateDogForm totalDogs={dogs.length} /> : ""}
      </FunctionalSection>
    </div>
  );
}

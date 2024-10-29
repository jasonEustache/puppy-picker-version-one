export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async () => {
    return await fetch(baseUrl + "/dogs").then((response) => {
      return response.json();
    });
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (newObj) => {
    const url = baseUrl + "/dogs";
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(newObj),
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  // should delete a dog from the database
  deleteDog: async (id, newObj) => {
    const url = baseUrl + `/dogs/${id}`;
    return await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(newObj),
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  updateDog: async (id, newObj) => {
    const url = baseUrl + `/dogs/${id}`;
    return await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(newObj),
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};

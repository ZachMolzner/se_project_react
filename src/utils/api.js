// src/utils/api.js

const BASE_URL = "http://localhost:3001";

export const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

// GET /items – fetch all clothing items
export const getItems = () => {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
};

// POST /items – add a new clothing item
export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
};

// DELETE /items/:id – delete a clothing item
export const deleteItem = (id) => {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    // json-server returns an empty body by default for DELETE,
    // so we just resolve if no error:
    return Promise.resolve();
  });
};

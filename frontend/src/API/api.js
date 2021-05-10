import axios from "axios";

const url = "http://localhost:3000";

//get all data
export const getData = (payload) => {
  return axios(`${url}/all-data`, {
    method: "GET",
    headers: {
      "content-type": "application/json", // whatever you want
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//get single data
export const getSingleData = (payload) => {
  return axios(`${url}/singledata/${payload}`, {
    method: "GET",
    headers: {
      "content-type": "application/json", // whatever you want
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//POST / create new user
export const createUser = (payload) => {
  console.log(payload, "data from the from");

  return axios(`${url}/createuser/${payload._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json", // whatever you want
    },
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//Delete existing user
export const deleteUser = (payload) => {
  //console.log(payload, "data from the from");

  return axios(`${url}/delete/${payload}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json", // whatever you want
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//update user
export const updateUser = (payload) => {
  console.log(payload, "data from the from");
  const sendData = {
    fname: payload.fname,
    lname: payload.lname,
    bio: payload.bio,
    dob: payload.dob,
    org: payload.org,
    status: payload.status,
  };
  return axios(`${url}/updateuser/${payload.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json", // whatever you want
    },
    data: sendData,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

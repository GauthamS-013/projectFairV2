import commonApi from "./commonApi";
import base_url from "./base_url";

export const signupApi = async (data) => {
  return await commonApi(`${base_url}/reg`, "POST", "", data);
};

export const loginApi = async (data) => {
  return await commonApi(`${base_url}/login`, "POST", "", data);
};

export const addProjectApi = async (data) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Token ${sessionStorage.getItem("token")}`,
  };

  return await commonApi(`${base_url}/addproject`, "POST", headers, data);
};

export const getUserProjectApi = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${sessionStorage.getItem("token")}`,
  };
  return await commonApi(`${base_url}/userproject`, "GET", headers, "");
};

export const deleteUserProjectApi = async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${sessionStorage.getItem("token")}`,
  };
  return await commonApi(
    `${base_url}/deleteproject/${id}`,
    "DELETE",
    headers,
    {},
  );
};

export const updateProjectApi = async (id, data) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Token ${sessionStorage.getItem("token")}`,
  };
  return await commonApi(`${base_url}/editproject/${id}`, "PUT", headers, data);
};

export const sampleProjectsApi = async () => {
  return await commonApi(`${base_url}/randomprojects`, "GET", "", "");
};


export const allProjectsApi = async (
  search = "",
  page = 1,
  tech = "All",
  sortBy = "newest"
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${sessionStorage.getItem("token")}`,
  };

  const params = new URLSearchParams({
    search,
    page: String(page),
    tech,
    sortBy,
  });

  return await commonApi(
    `${base_url}/allproject?${params.toString()}`,
    "GET",
    headers,
    ""
  );
};

export const getProjectTechnologiesApi = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${sessionStorage.getItem("token")}`,
  };

  return await commonApi(
    `${base_url}/project-technologies`,
    "GET",
    headers,
    ""
  );
};


export const updateProfileApi = async (data) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Token ${sessionStorage.getItem("token")}`,
  };
  return await commonApi(`${base_url}/updateprofile`, "PUT", headers, data);
};

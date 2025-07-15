import axiosConfig from "../axios";
export const getCurrent = async () => {
  try {
    const response = await axiosConfig({
      method: "GET",
      url: "/user/current",
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during get current:", error);
    throw error;
  }
};

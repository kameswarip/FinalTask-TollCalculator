import axios from "axios";

const API_URL = "https://dev.tollguru.com/v1/calc/route";
const API_KEY = "Hmr3Q9njqPHjQ7p69fDPPqbgpNmRBptm"; // Replace with your API key

export const calculateTollCost = async (start, end) => {
  const data = {
    source: start,
    destination: end,
    vehicleType: "2AxlesAuto", // Example vehicle type
  };

  try {
    const response = await axios.post(API_URL, data, {
      headers: { "x-api-key": API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching toll data:", error);
    throw error;
  }
};

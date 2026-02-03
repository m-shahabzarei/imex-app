import axios from "axios";

export const addToMarket = (tariff: string) =>
  axios.post("/users/marks", { tariff });

export const removeFromMarket = (tariff: string) =>
  axios.delete(`/users/marks/${tariff}`);
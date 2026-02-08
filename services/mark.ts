import api from "@/lib/api";

export const addToMarket = (tariff: number) =>
  api.post("/users/marks", { tariff });

export const removeFromMarket = (tariff: number) =>
  api.delete(`/users/marks/${tariff}`);
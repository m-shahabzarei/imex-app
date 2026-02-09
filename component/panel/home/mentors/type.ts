import { ReactElement } from "react";

export interface Iitem {
  image: string;
  name: string | ReactElement;
  group: string;
  progress: string;
  country: string;
  link : string;
}
export interface Imentor {
  id: number;
  image: string;
  full_name: string;
  product_group: {
    title: string;
  };
  process: {
    title: string;
  };
  country: {
    name: string;
  };
}

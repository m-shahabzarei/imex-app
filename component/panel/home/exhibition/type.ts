import { ReactElement } from "react";

export interface Iitem {
  start_date: string;
  end_date: string;
  image: string | "";
  location: string | "";
  title: ReactElement;
  link: string;
  type: string;
  days_until_start: string;
}

export interface Iexhibition {
  id: number;
  start_date: string;
  end_date: string;
  image: string;
  location: {
    title: string;
  };
  title: string;
  link: string;
  head: string;
  description: string;
  address: string;
  supervising_manager: string;
  phone: [];
  site: string;
  fax: string;
  visiting_hour: [];
  type: string;
  days_until_start: string;

  presenter: string;
}

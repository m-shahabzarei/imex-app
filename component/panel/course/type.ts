/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ICourse {
  id: number;
  title: string;
  description: string;
  image: string;
  time: string;
  price: any;
  teacher: string;
  link: string;
  owner: string;
  price_discount: number;
  type: string;
}

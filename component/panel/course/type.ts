/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ICourse {
  id: number;
  title: any;
  description: any;
  image: string;
  time: string;
  price: any;
  teacher: string;
  link: string;
  owner: string;
  price_discount: number;
  type: string;
}

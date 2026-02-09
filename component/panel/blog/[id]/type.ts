export interface IData {
  id: number;
  title: string;
  country: {
    name:string;
  }
  category: {
    title:string;
  }
  created_at: string;
  image: string;
  description:string;
  link:string;
}

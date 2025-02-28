export interface IBook {
  _id: string;
  catalog_id: string;
  title: string;
  author: string;
  description: string;
  publishedDate: Date;
  imageLink: string;
  price: number;
  totalInStock: number;
  totalAddedToCart: number;
}

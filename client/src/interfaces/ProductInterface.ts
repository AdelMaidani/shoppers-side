export interface iProducts {
  size: any;
  products: {
    _id: string;
    productName: string;
    price: number;
    category: string;
    subCategory: string;
    description: string;
    images: [string];
    size: [
      {
        size: string;
        q: string;
        sold: number;
      }
    ];
    coverPhoto: string;
    date: Date;
  }[];
}

export interface Product {
  _id: string;
  productName: string;
  price: number;
  category: string;
  subCategory: string;
  description: string;
  images: [string];
  size: [
    {
      size: string;
      q: string;
    }
  ];
  coverPhoto: string;
  date: Date;
}

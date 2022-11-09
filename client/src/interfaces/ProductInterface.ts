export interface iProducts {
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
      }
    ];
    coverPhoto: string;
    date: Date;
  }[];
}

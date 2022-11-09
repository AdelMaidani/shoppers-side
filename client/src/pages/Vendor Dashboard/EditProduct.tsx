import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Iproduct = {
  product: {
    category: string;
    coverPhoto: String;
    date: Date;
    description: String;
    images: [];
    price: Number;
    productName: String;
    size: [];
    subCategory: String;
  };
};

const EditProduct = () => {
  const [product, setProduct] = useState<Iproduct["product"]>();
  const id = useParams();

  useEffect(() => {
    axios({
      method: "Post",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/vendor/getProductById",
      data: { id: id.id },
    })
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  console.log(product);

  return (
    <div className="p-10 flex flex-col gap-10 justify-around">
      <div className="flex gap-2 items-center">
        <span className="font-bold">Title:</span>{" "}
        <span className="text-xs">{product?.productName}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-bold">Price:</span>
        <span className="text-xs">{product?.price.toString()}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span className="font-bold">Description:</span>
        <span className="text-xs">{product?.description}</span>
      </div>
      <div className="font-bold">Product Pictures:</div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {product?.images.map((photo) => (
          <div className="w-60 h-60 flex justify-center">
            <img src={photo} alt="Photo" className="object-fit w-auto h-full" />
          </div>
        ))}
      </div>
      <div className="border-2 w-32 text-center p-2 border-black hover:bg-black hover:text-white duration-500">
        Save Changes
      </div>
    </div>
  );
};

export default EditProduct;

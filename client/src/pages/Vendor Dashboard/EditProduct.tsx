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

  const [editTitle, setTitle] = useState(false);
  const [price, setPrice] = useState(false);
  const [description, setDescription] = useState(false);
  const [category, setCategory] = useState(false);
  const [subCategory, setSubcategory] = useState(false);

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

  return (
    <div className="p-10 flex flex-col gap-10 justify-around">
      {/* Edit Product Name */}
      <div className="flex gap-2 items-center">
        <span className="font-bold w-40">Product name:</span>
        <div
          className={`${
            editTitle ? "hidden" : "block"
          } flex gap-2 text-center justify-center`}
        >
          <input
            type="text"
            id="title"
            className="border-gray-400 p-2 border"
            value={product?.productName.toString()}
          />
          <span
            className="border border-black p-1 text-xs hover:bg-black hover:text-white duration-500 cursor-pointer"
            onClick={() => setTitle(true)}
          >
            Edit
          </span>
        </div>
        <div className={`${editTitle ? "block" : "hidden"}`}>
          <input
            type="text"
            id="newTitle"
            className="border-gray-400 p-2 border"
          />
        </div>
      </div>
      {/* Edit price */}
      <div className="flex gap-2 items-center">
        <span className="font-bold w-40">Price:</span>
        <div
          className={`${
            price ? "hidden" : "block"
          }  flex gap-2 text-center justify-center`}
        >
          <input
            type="text"
            id="price"
            className="border-gray-400 p-2 border"
            value={product?.price.toString()}
          />
          <span
            onClick={() => setPrice(true)}
            className="border border-black p-1 text-xs hover:bg-black hover:text-white duration-500 cursor-pointer"
          >
            Edit
          </span>
        </div>
        <div className={`${price ? "block" : "hidden"}`}>
          <input
            type="text"
            id="newPrice"
            className="border-gray-400 p-2 border w-82"
          />
        </div>
      </div>
      {/* Edit description */}
      <div className="flex gap-2 items-center">
        <span className="font-bold w-40">Description:</span>
        <div
          className={`${
            description ? "hidden" : "block"
          } flex gap-2 text-center justify-center`}
        >
          <input
            type="text"
            id="description"
            className="border-gray-400 p-2 border w-full"
            value={product?.description.toString()}
          />
          <span
            onClick={() => setDescription(true)}
            className="border border-black p-1 text-xs hover:bg-black hover:text-white duration-500 cursor-pointer"
          >
            Edit
          </span>
        </div>
        <div className={`${description ? "block" : "hidden"}`}>
          <textarea id="newDescription" className="w-full text-xs border  " />
        </div>
      </div>
      {/* Edit category */}
      <div className="flex gap-2 items-center">
        <span className="font-bold w-40">Category:</span>
        <div
          className={`${
            category ? "hidden" : "block"
          } flex gap-2 text-center justify-center`}
        >
          <input
            type="text"
            id="category"
            className="border-gray-400 p-2 border w-40"
            value={product?.category.toString()}
          />
          <span
            onClick={() => setCategory(true)}
            className="border border-black p-1 text-xs hover:bg-black hover:text-white duration-500 cursor-pointer"
          >
            Edit
          </span>
        </div>
        <div className={`${category ? "block" : "hidden"}`}>
          <select
            name="category"
            id="category"
            className="border-gray-400 p-2 border w-40"
          >
            <option>Select</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kid</option>
          </select>
        </div>
      </div>
      {/* Edit subCategory */}
      <div className="flex gap-2 items-center">
        <span className="font-bold w-40">Sub Category:</span>
        <div
          className={`${
            subCategory ? "hidden" : "block"
          } flex gap-2 text-center justify-center`}
        >
          <input
            type="text"
            id="subCategory"
            className="border-gray-400 p-2 border w-40"
            value={product?.subCategory.toString()}
          />
          <span
            onClick={() => setSubcategory(true)}
            className="border border-black p-1 text-xs hover:bg-black hover:text-white duration-500 cursor-pointer"
          >
            Edit
          </span>
        </div>
        <div className={`${subCategory ? "block" : "hidden"}`}>
          <select
            name="subCategory"
            className="border-gray-400 p-2 border w-40"
          >
            <option>Select</option>
            <option value="Bag">Bag</option>
            <option value="Jacket">Jacket</option>
            <option value="Coat">Coat</option>
            <option value="Pants&Shorts">Pants & Shorts</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Tracksuit">Tracksuit</option>
            <option value="Wallet">Wallet</option>
            <option value="Belts">Belts</option>
            <option value="Eyewear">Eyewear</option>
            <option value="Sock">Sock</option>
            <option value="Hat">Hat</option>
          </select>
        </div>
      </div>
      {/* Edit Product pictures */}
      <div className="flex gap-10">
        <div className="font-bold">Product Pictures:</div>
        <div className="p-2 gap-3 flex flex-wrap">
          {product?.images.map((photo) => (
            <div className="w-40 gap-2 flex flex-col hover:border-black hover:bg-black hover:text-white duration-500 border p-1">
              <img
                src={photo}
                alt="Photo"
                className="object-fit w-auto h-full"
              />
              <div>Edit</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="border-2 w-32 cursor-pointer text-center p-2 border-black hover:bg-black hover:text-white duration-500">
          Save Changes
        </div>
        <div className="text-red-500 cursor-pointer border-2 w-32 text-center p-2 border-red-500 hover:bg-red-500 hover:text-white duration-500">
          Delete Product
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

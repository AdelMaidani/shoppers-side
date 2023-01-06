import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";

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
  const [sizeCount, setSize] = useState(1);

  const id = useParams();

  useEffect(() => {
    axios({
      method: "Post",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:5000/api/vendor/getProductById",
      data: { id: id.id },
    })
      .then((res) => {
        setProduct(res.data[0]);
        formik.values.size = res.data[0].size;
        formik.values.productName = res.data[0].productName;
        formik.values.price = res.data[0].price;
        formik.values.category = res.data[0].category;
        formik.values.subCategory = res.data[0].subCategory;
        formik.values.description = res.data[0].description;
        formik.values.images = res.data[0].images;
        formik.values.coverPhoto = res.data[0].coverPhoto;
      })
      .catch((err) => console.log(err));
  }, []);

  function addSize() {
    const sizes: any = formik.values.size;
    const sizeName = document.getElementById("getSizeName") as HTMLInputElement;
    const sizeQuantity = document.getElementById(
      "getSizeQuantity"
    ) as HTMLInputElement;
    const size = sizeName.value;
    const q = parseInt(sizeQuantity.value);
    const sold: Number = 0;
    const ar = { size, q, sold };
    sizes.push(ar);
    setSize(sizeCount + 1);
    sizeName.value = "";
    sizeQuantity.value = "";
  }

  function removeSize(size: string, q: number) {
    const sizes: any = formik.values.size;
    const toRemove = { size, q };
    sizes.splice(
      sizes.findIndex(
        (a: any) => a.q === toRemove.q && a.size === toRemove.size
      ),
      1
    );
    setSize(sizeCount + 1);
  }

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      category: "",
      subCategory: "",
      description: "",
      images: [""],
      coverPhoto: "",
      size: [],
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .min(2, "Atleast 2 charecter required")
        .max(40, "Maximum 40 charecter")
        .required("Please enter product name"),
      price: Yup.number().required("Please enter price"),
      category: Yup.string().required("Please choose category"),
      subCategory: Yup.string().required("Please choose sub category"),
      description: Yup.string()
        .min(2, "Atleast 2 charecter required")
        .max(1000, "Maximum 1000 charecter")
        .required("Please enter description"),
      images: Yup.array().nullable(),
      coverPhoto: Yup.string(),
    }),
    onSubmit: (value) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="p-10 flex flex-col gap-10 justify-around"
    >
      <div className="flex flex-col gap-2">
        {/* Product Name */}
        <div className="flex gap-2 items-center">
          <span className="w-40 sm:w-32">Product Name:</span>
          <input
            defaultValue={product?.productName.toString()}
            type="text"
            className="h-10 border-gray-400 p-2 border w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="productName"
            placeholder="Blue Jacket"
          />
        </div>
        <div className="h-1">
          {formik.touched.productName && formik.errors.productName ? (
            <p className="text-red-500 text-xs">{formik.errors.productName}</p>
          ) : null}
        </div>
      </div>

      {/* Price  */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="w-40 sm:w-32">Price:</span>
          <input
            type="string"
            defaultValue={product?.price.toString()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="price"
            placeholder="4200"
            className="h-10 border-gray-400 p-2 border w-full"
          />
        </div>
        <div className="h-1">
          {formik.touched.price && formik.errors.price ? (
            <p className="text-red-500 text-xs">{formik.errors.price}</p>
          ) : null}
        </div>
      </div>
      {/* Category */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="w-40 sm:w-32">Category:</span>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={product?.category.toString()}
            name="category"
            className="h-10 border-gray-400 p-2 border w-full"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kid">Kid</option>
          </select>
        </div>
        <div className="h-1">
          {formik.touched.category && formik.errors.category ? (
            <p className="text-red-500 text-xs">{formik.errors.category}</p>
          ) : null}
        </div>
      </div>
      {/* Sub Category */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="w-40 sm:w-32">Sub category:</span>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={product?.subCategory.toString()}
            name="subCategory"
            className="h-10 border-gray-400 p-2 border w-full"
          >
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
        <div className="h-1">
          {formik.touched.subCategory && formik.errors.subCategory ? (
            <p className="text-red-500 text-xs">{formik.errors.subCategory}</p>
          ) : null}
        </div>
      </div>

      {/* Add Size  */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <span className="w-40 sm:w-32">Add size:</span>
          {/* Create Size */}
          <div className="flex flex-col gap-3">
            <div id="sizeForm" className="flex gap-5">
              <input
                type="text"
                placeholder="Size"
                id="getSizeName"
                className="h-10 border-gray-400 p-2 border w-full"
              />
              <input
                type="number"
                id="getSizeQuantity"
                placeholder="Quantity"
                className="h-10 border-gray-400 p-2 border w-full"
              />
              <button
                type="button"
                onClick={addSize}
                className="border border-gray-400 hover:bg-green-400 duration-300 w-10"
              >
                +
              </button>
            </div>
            {/* Map */}
            {sizeCount &&
              formik.values.size.map((va: any) => (
                <div className="flex gap-5" key={va.size}>
                  <input
                    type="text"
                    placeholder="Size"
                    readOnly
                    value={va.size}
                    className="h-10 border-gray-400 p-2 border w-full"
                  />
                  <input
                    type="number"
                    readOnly
                    value={va.q}
                    placeholder="Quantity"
                    className="h-10 border-gray-400 p-2 border w-full"
                  />
                  <button
                    type="button"
                    value={(va.q, va.size)}
                    onClick={() => removeSize(va.size, va.q)}
                    className="border border-gray-400 hover:bg-red-400 duration-300 w-10"
                  >
                    -
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="h-1">
          {formik.touched.size && formik.errors.size ? (
            <p className="text-red-500 text-xs">{formik.errors.size}</p>
          ) : null}
        </div>
      </div>

      {/* Description  */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <span className="w-40 sm:w-32">Description:</span>
          <textarea
            defaultValue={product?.description.toString()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
            className="border-gray-400 h-40 p-2 border"
          />
        </div>
        <div className="h-1">
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-xs">{formik.errors.description}</p>
          ) : null}
        </div>
      </div>
      {/* Edit cover photo */}
      <div className="flex gap-10">
        <div className="font-bold w-30">Cover Picture:</div>
        <div className="p-2 gap-3 w-full">
          <div className="w-40 gap-2 flex flex-col hover:border-black hover:bg-black hover:text-white duration-500 border p-1">
            <img
              src={product?.coverPhoto.toString()}
              alt="Photo"
              className="object-fit w-auto h-full"
            />
            <div>Edit</div>
          </div>
        </div>
      </div>
      {/* Edit Product pictures */}
      <div className="flex gap-10">
        <div className="w-30 font-bold">Product Picture:</div>
        <div className="p-2 gap-3 w-full flex flex-wrap">
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
        <button
          onBlur={formik.handleBlur}
          type="submit"
          name="submit"
          className="border-2 w-32 cursor-pointer text-green-400 text-center p-2 border-green-400 hover:bg-green hover:text-white hover:bg-green-400 duration-500"
        >
          Save changes
        </button>
        <div className="border-2 w-32 cursor-pointer text-center p-2 border-black hover:bg-black hover:text-white duration-500">
          No changes
        </div>
        <div className="text-red-500 cursor-pointer border-2 w-32 text-center p-2 border-red-500 hover:bg-red-500 hover:text-white duration-500">
          Delete Product
        </div>
      </div>
    </form>
  );
};

export default EditProduct;

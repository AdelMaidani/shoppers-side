import VendorNav from "../../components/VendorNav";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { scrollToTop } from "../../utils/ScrolToTop";

const AddProduct = () => {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeCount, setSize] = useState(1);

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
        .max(40, "Maximum 40 charecter"),
      price: Yup.number(),
      category: Yup.string(),
      subCategory: Yup.string(),
      description: Yup.string()
        .min(2, "Atleast 2 charecter required")
        .max(1000, "Maximum 1000 charecter"),
      images: Yup.array().nullable(),
      coverPhoto: Yup.string(),
    }),
    onSubmit: (values) => {
      setAdding(true);
      const productImages = document.getElementById(
        "file_input"
      ) as HTMLInputElement | null;
      async function uploadCover() {
        const url = await axios.get("http://localhost:5000/api/aws/getUrl");
        formik.values.coverPhoto = url.data.url.split("?")[0];
        const file = document.getElementById(
          "file_input_cover"
        ) as HTMLInputElement | null;
        if (file?.files?.length === undefined) {
        } else {
          await axios({
            method: "Put",
            headers: { "Content-Type": "multipart-form-data" },
            url: url.data.url,
            data: file.files[0],
          })
            .then((res) => console.log("cover uploaded"))
            .catch((err) => console.log(err));
        }
      }
      const form = document.getElementById("productAdd") as HTMLFormElement;
      const images = formik.values.images;
      if (productImages?.files?.length === undefined) {
      } else if (productImages.files.length > 0) {
        let uploaded = 0;
        formik.values.images.filter((e) => e);
        Array.from(productImages.files).forEach(async (file) => {
          const url = await axios.get("http://localhost:5000/api/aws/getUrl");
          images.push(url.data.url.split("?")[0]);
          uploadCover();
          await axios({
            method: "Put",
            headers: { "Content-Type": "multipart-form-data" },
            url: url.data.url,
            data: file,
          }).then(() => {
            uploaded++;
            console.log("done");
          });
          if (uploaded === productImages.files?.length) {
            const finalImages = images.filter((element) => {
              return element !== "";
            });
            formik.values.images = finalImages;
            axios({
              method: "Post",
              headers: { "Content-Type": "application/json" },
              url: "http://localhost:5000/api/vendor/createProduct",
              withCredentials: true,
              data: values,
            })
              .then((res) => {
                console.log(res.data);
                setAdding(false);
                setAdded(true);
                scrollToTop();
                form.reset();
                formik.values.size = [];
                setTimeout(() => {
                  setAdded(false);
                }, 3000);
              })
              .catch((err) => console.log(err));
          }
        });
      } else {
        setAdding(false);
      }
    },
  });

  return (
    <div className="flex h-full flex-col text-xs items-center gap-10 p-10">
      <VendorNav />
      <form
        onSubmit={formik.handleSubmit}
        id="productAdd"
        className="flex flex-col gap-10 sm:w-1/2 text-black"
      >
        <div className={` h-10 text-green-400 ${added ? "block" : "hidden"}`}>
          Producted Added
        </div>
        <div className="flex flex-col gap-2">
          {/* Product Name */}
          <div className="flex gap-2 items-center">
            <span className="w-40 sm:w-32">Product Name:</span>
            <input
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
              <p className="text-red-500 text-xs">
                {formik.errors.productName}
              </p>
            ) : null}
          </div>
        </div>

        {/* Price  */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="w-40 sm:w-32">Price:</span>
            <input
              type="number"
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
              name="category"
              className="h-10 border-gray-400 p-2 border w-full"
            >
              <option>Select</option>
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
              name="subCategory"
              className="h-10 border-gray-400 p-2 border w-full"
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
          <div className="h-1">
            {formik.touched.subCategory && formik.errors.subCategory ? (
              <p className="text-red-500 text-xs">
                {formik.errors.subCategory}
              </p>
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
            {formik.touched.price && formik.errors.price ? (
              <p className="text-red-500 text-xs">{formik.errors.price}</p>
            ) : null}
          </div>
        </div>

        {/* Description  */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <span className="w-40 sm:w-32">Description:</span>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="description"
              className="border-gray-400 h-40 p-2 border"
            />
          </div>
          <div className="h-1">
            {formik.touched.description && formik.errors.description ? (
              <p className="text-red-500 text-xs">
                {formik.errors.description}
              </p>
            ) : null}
          </div>
        </div>

        {/* Upload Images  */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="w-40 sm:w-32">Upload images:</label>
            <input
              className="h-10 border-gray-400 p-2 border w-full"
              id="file_input"
              type="file"
              multiple
              name="images"
            />
            <p className="mt-1 text-sm text-gray-400" id="file_input_help">
              Image formate: SVG, PNG, JPG
            </p>
          </div>
          <div className="h-1">
            {formik.touched.images && formik.errors.images ? (
              <p className="text-red-500 text-xs">{formik.errors.images}</p>
            ) : null}
          </div>
        </div>

        {/* Cover Image  */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="w-40 sm:w-32">Upload cover photo:</label>
            <input
              className="h-10 border-gray-400 p-2 border w-full"
              id="file_input_cover"
              type="file"
              name="images"
            />
            <p className="mt-1 text-sm text-gray-400" id="file_input_help">
              Only one image accepted
            </p>
          </div>
          <div className="h-1">
            {formik.touched.images && formik.errors.images ? (
              <p className="text-red-500 text-xs">{formik.errors.images}</p>
            ) : null}
          </div>
        </div>

        {/* Submit  */}

        <div className="border h-10 bg-black items-center text-white flex flex-col justify-center border-black b">
          {adding ? (
            <div
              className="inline-block w-4 h-4
          border-t-4 
          border-white  
          rounded-full 
          animate-spin"
            ></div>
          ) : (
            <button type="submit" className="w-full">
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

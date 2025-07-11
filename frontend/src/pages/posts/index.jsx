import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import UploadCard from "../../components/upload";
import { Input, TextArea } from "../../components/inputs";
import { PrimaryButton } from "../../components/buttons";
import Banner from "../../components/banners";
import { useNavigate } from "react-router-dom"; 
const Post = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); 
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!selectedFile) {
        toast.error("Please select an image to upload");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("file", selectedFile);

      try {
        await axios.post("http://localhost:8080/api/post", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Pin created successfully!");
        resetForm();
        setSelectedFile(null);
                setTimeout(() => {
          navigate("/home"); 
        }, 2000);
      } catch (error) {
        toast.error(
          error.response?.data?.message
        );
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col w-full h-full">
        <div className="w-full py-5 px-4 flex items-center border-y border-y-gray-200">
          <div className="text-[20px] font-bold">Create Pin</div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full h-full flex-1 flex p-3 mt-4 justify-center"
        >
          <div className="w-3/6 flex items-start gap-6">
            <div>
              <UploadCard onFileSelect={(file) => setSelectedFile(file)} />
            </div>

            <div className="flex flex-col w-full gap-5 p-4">
              {Object.keys(formik.errors).length > 0 &&
                formik.submitCount > 0 && (
                  <Banner
                    variant="danger"
                    message="Please fix the following errors:"
                    caption={
                      <ul className="list-disc list-inside text-sm">
                        {Object.entries(formik.errors).map(
                          ([field, error], index) => (
                            <li key={index} name={field}>
                              {error}
                            </li>
                          )
                        )}
                      </ul>
                    }
                  />
                )}
              <Input
                label="Title"
                name="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
              />

              <TextArea
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />

              <PrimaryButton type="submit" className="mt-4">
                Publish
              </PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;

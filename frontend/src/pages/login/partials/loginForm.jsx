import { PrimaryButton, TextButton } from "../../../components/buttons";
import { Input, PasswordInput } from "../../../components/inputs";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Banner from "../../../components/banners";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 

export default function LoginForm({ setSignUp }) {
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      pass: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setFieldValue, resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/login",
          {
            email: values.email,
            pass: values.pass,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Login successful!", { duration: 2000 });
        resetForm();

        setTimeout(() => {
          navigate("/home"); 
        }, 2000);
      } catch (error) {
        setFieldValue("pass", "");
        toast.error(error.response?.data?.message || "Invalid credentials");
      }
    },
  });

  return (
    <>
      <Toaster />
      {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
        <Banner
          variant="danger"
          message="Please fix the following errors:"
          caption={
            <ul className="list-disc list-inside text-sm">
              {Object.entries(formik.errors).map(([field, error], index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          }
        />
      )}

      <form onSubmit={formik.handleSubmit} className="w-[70%] flex flex-col gap-3">
        <Input
          label="Email"
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <PasswordInput
          label="Password"
          name="pass"
          value={formik.values.pass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          showIcon
        />

        <PrimaryButton type="submit" className="my-9">
          Login
        </PrimaryButton>

        <div className="flex items-center gap-2 justify-center">
          <div className="text-[13px] text-gray-400">Not on Pinterest yet?</div>
          <TextButton
            padding
            className="text-[13px] font-semibold"
            click={() => setSignUp(true)}
          >
            Sign Up
          </TextButton>
        </div>
      </form>
    </>
  );
}

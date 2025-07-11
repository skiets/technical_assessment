import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, PasswordInput } from "../../../components/inputs";
import { PrimaryButton, TextButton } from "../../../components/buttons";
import Banner from "../../../components/banners";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function RegisterForm({ setSignUp }) {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      pass: "",
      cpass: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Fullname is required")
        .matches(
          /^[A-Za-z\s]+$/,
          "Fullname must contain only letters and spaces"
        ),
      email: Yup.string().email("Invalid email").required("Email is required"),
      pass: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required")
        .matches(/[a-z]/, "Must include a lowercase letter")
        .matches(/[A-Z]/, "Must include an uppercase letter")
        .matches(/[0-9]/, "Must include a number"),
      cpass: Yup.string()
        .oneOf([Yup.ref("pass"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values, { setFieldValue, resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/register",
          {
            fullname: values.fullname,
            email: values.email,
            pass: values.pass,
            cpass: values.cpass,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success("Registered successfully!", { duration: 3000 });



        resetForm();
                setTimeout(() => {
          setSignUp(false);
        }, 3000);
        
      } catch (error) {
        setFieldValue("pass", "");
        setFieldValue("cpass", "");
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
        <Banner
          variant="danger"
          message="Please fix the following errors:"
          caption={
            <ul className="list-disc list-inside text-sm">
              {Object.entries(formik.errors).map(([field, error], index) => (
                <li key={index} name={field}>
                  {error}
                </li>
              ))}
            </ul>
          }
        />
      )}

      <form
        onSubmit={formik.handleSubmit}
        className="w-[70%] flex flex-col gap-3"
      >
        <Input
          label="Fullname"
          name="fullname"
          extraClass="capitalize"
          value={formik.values.fullname}
          onChange={formik.handleChange}
        />

        <Input
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <PasswordInput
          label="Password"
          name="pass"
          value={formik.values.pass}
          onChange={formik.handleChange}
        />
        <PasswordInput
          label="Confirm Password"
          name="cpass"
          value={formik.values.cpass}
          onChange={formik.handleChange}
        />
        <PrimaryButton type="submit" className="my-9">
          Register
        </PrimaryButton>

        <div className="flex items-center gap-2 justify-center">
          <div className="text-[13px] text-gray-400">
            Already have an account?
          </div>
          <TextButton
            padding
            className="text-[13px] font-semibold"
            click={() => setSignUp(false)}
          >
            Sign In
          </TextButton>
        </div>
      </form>
    </>
  );
}

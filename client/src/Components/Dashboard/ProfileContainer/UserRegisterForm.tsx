import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { useState } from "react";
import { AxiosError } from "axios";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";

const UserRegisterForm = () => {
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string>("");
  const locale = useLocale();

  const validationSchema = Yup.object({
    fName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    // username: Yup.string().min(4, "Username must be at least 4 characters").required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      // username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("auth_token")}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(values),
          }
        );

        const data = await result.json();

        if (!result.ok) {
          if (data.message.includes("duplicate key error")) {
            return setAlertMessage("User With This Email Already Exists");
          } else {
            return setAlertMessage(data.message);
          }
        }

        if (result.ok && data) {
          toast.success("User Added successfully");
          router.push(`/${locale}/dashboard/users`);
        }
      } catch (error) {
        if (error instanceof Error || error instanceof AxiosError) {
          toast.error(`Adding user failed. Please try again ${error.message}`);
        } else {
          toast.error(
            "Adding user failed. Please try again. An unknown error occurred."
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <div className="login-main">
        <Form className="theme-form" onSubmit={formik.handleSubmit}>
          <h4>Sign Up to Account</h4>
          <p>Enter the details to create an account</p>
          {alertMessage && (
            <Alert fade color="danger">
              {alertMessage}
            </Alert>
          )}
          <FormGroup>
            <Label className="col-form-label">First Name</Label>
            <Input
              type="text"
              name="fName"
              placeholder="Enter Your First Name"
              value={formik.values.fName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.fName && !!formik.errors.fName}
            />
            {formik.touched.fName && formik.errors.fName && (
              <div className="text-danger">{formik.errors.fName}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">Last Name</Label>
            <Input
              type="text"
              name="lName"
              placeholder="Enter Your Last Name"
              value={formik.values.lName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.lName && !!formik.errors.lName}
            />
            {formik.touched.lName && formik.errors.lName && (
              <div className="text-danger">{formik.errors.lName}</div>
            )}
          </FormGroup>
          {/* <FormGroup>
            <Label className="col-form-label">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter Your Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.username && !!formik.errors.username}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-danger">{formik.errors.username}</div>
            )}
          </FormGroup> */}
          <FormGroup>
            <Label className="col-form-label">Email Address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.email && !!formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={formik.touched.password && !!formik.errors.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">Confirm Password</Label>
            <Input
              type="password"
              name="passwordConfirm"
              placeholder="Enter Your Password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={
                formik.touched.passwordConfirm &&
                !!formik.errors.passwordConfirm
              }
            />
            {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm && (
                <div className="text-danger">
                  {formik.errors.passwordConfirm}
                </div>
              )}
          </FormGroup>
          <FormGroup className="mb-0">
            <div className="text-end mt-4">
              <Button
                color="primary"
                block
                className="w-100"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Sign Up
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default UserRegisterForm;

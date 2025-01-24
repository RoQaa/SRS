import {
  EmailAddressLogIn,
  Password,
  SignIn,
  SignInToAccount,
} from "@/Constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { useAppDispatch } from "@/Redux/Hooks";
import { login } from "@/Redux/Reducers/UserSlice";

const UserForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);
  const dispatch = useAppDispatch();

  const formSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (!result?.status) {
        setAlertMessage(result.message || "Invalid credentials");
        setVisible(true);
      } else {
        console.log(result);
        
        Cookies.set("mofi_token", JSON.stringify(true));
        Cookies.set("auth_token", result.token);
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            fName: result.data.fName,
            lName: result.data.lName,
            role: result.data.role,
            email: result.data.email,
          })
        );
        router.push("/dashboard/");
        toast.success("Login successful");
        setAlertMessage("");
      }
    } catch (error) {
      if (typeof error === "string") {
        setAlertMessage(error);
      } else {
        setAlertMessage("Login failed. Please try again.");
      }
      setVisible(true);
    }
  };

  return (
    <div>
      <div>
        <Link className="logo" href={`/sample_page`}>
          <img
            className="img-fluid for-light"
            src={"/imgs/Clicks-Master.svg"}
            alt="login page"
            style={{ width: "150px" }}
          />
          <img
            className="img-fluid for-dark"
            src={"/imgs/Clicks-White.svg"}
            alt="login page"
            style={{ width: "150px" }}
          />
        </Link>
      </div>
      <div className="login-main">
        <Form className="theme-form" onSubmit={formSubmitHandle}>
          <h4>{SignInToAccount}</h4>
          <p>Enter your email & password to login</p>
          {alertMessage && (
            <Alert fade color="danger" isOpen={visible} toggle={onDismiss}>
              {alertMessage}
            </Alert>
          )}
          <FormGroup>
            <Label className="col-form-label">{EmailAddressLogIn}</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter Your Email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="position-relative">
              <Input
                type={show ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter Your Password"
                required
              />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>
          <FormGroup className="mb-0">
            <div className="text-end mt-4">
              <Button color="primary" block className="w-100" type="submit">
                {SignIn}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;

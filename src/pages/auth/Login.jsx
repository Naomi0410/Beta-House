import { ActionButton, FormInputs, Headings, Texts } from "@/components";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import styles from "../styles.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { handleError, validateFields } from "@/utils";
import { userService } from "@/api";
import { toast } from "react-toastify";
import { useStore } from "@/hooks";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [reveal, setReveal] = useState(false);
  const { setToken } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  //toggle password
  const handleHide = () => {
    setReveal((prev) => !prev);
  };

  const onFormSubmit = async (credentials) => {
    try {
      const { status, data } = await userService.login(credentials);
      if (status === 200) {
        toast.success(data.msg);
        setToken(data.accessToken);
        navigate(from);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login to Beta-House</title>
        <meta name="description" content="Get right back in" />
      </Helmet>
      <div className="p-md-5">
        <Headings
          text="Welcome Back to BetaHouse!"
          size="2rem"
          color="var(--bg-zinc-800)"
        />
        <Texts
          text="Lets get started by filling out the information below"
          size="1.25rem"
          color="var(--bg-zinc-600)"
        />
        <Form className="mt-5" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mt-4">
            <p className="fw-medium">Email</p>
            <FormInputs
              type="email"
              id="email"
              label="Enter your Email"
              placeholder="Enter your Email"
              name="email"
              register={register}
              validateFields={validateFields?.email}
              errors={errors.email}
            />
          </div>
          <div className="position-relative mt-4">
            <p className="fw-medium">Password</p>
            <FormInputs
              type={reveal ? "text" : "password"}
              id="password"
              label="Enter your Password"
              placeholder="password"
              name="password"
              register={register}
              validateFields={validateFields?.password}
              errors={errors.password}
            />
            <Texts
              className="position-absolute top-50 end-0 translate-middle cursor"
              text={reveal ? <FaRegEyeSlash /> : <FaRegEye />}
              onClick={handleHide}
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Form.Check
              type="checkbox"
              id="rememberMe"
              label="Remember Me"
              {...register("rememberMe")}
            />
            <Link to="/authorize/forgot-password" className="text-danger">
              Forgot Password
            </Link>
          </div>
          <ActionButton
            text="Sign in"
            className="mt-3 w-100 btns"
            type="submit"
            pending={isSubmitting}
            disabled={isSubmitting}
          />
          <div className="mt-3 text-center" style={{ fontSize: "1.25rem" }}>
            <Form.Text>
              New User?{" "}
              <span
                className="fw-medium"
                style={{ color: "var(--bg-green-200)" }}
              >
                <Link to="/authorize/register">Sign up</Link>
              </span>
            </Form.Text>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;

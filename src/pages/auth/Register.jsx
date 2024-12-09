import { ActionButton, FormInputs, Headings, Texts } from "@/components";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { handleError, validateFields } from "@/utils";
import { userService } from "@/api";
import { toast } from "react-toastify";
import { useStore } from "@/hooks";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [reveal, setReveal] = useState(false);
  const [confirmReveal, setConfirmReveal] = useState(false);
  const { setToken } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleHide = () => {
    setReveal((prev) => !prev);
  };

  const handleConfirmHide = () => {
    setConfirmReveal((prev) => !prev);
  };

  const onFormSubmit = async (credentials) => {
    try {
      const { status, data } = await userService.register(credentials);
      if (status === 201) {
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
        <title>Register to Beta-House</title>
        <meta name="description" content="Explore the possibilities " />
      </Helmet>
      <div className="p-md-5">
        <Headings
          text="Join our community of home seekers and explore the possibilities that await."
          size="2rem"
          color="var(--bg-zinc-800)"
        />
        <Texts
          text="Lets get started by filling out the information below"
          size="1.25rem"
          color="var(--bg-zinc-600)"
        />
        <Form className="mt-5" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="d-flex gap-5">
            <div>
              <p className="fw-medium">First Name</p>
              <FormInputs
                type="text"
                id="firstName"
                label="Enter Name"
                placeholder="Enter Name"
                className="w-100"
                name="firstName"
                register={register}
                validateFields={validateFields?.firstName}
                errors={errors.firstName}
              />
            </div>
            <div>
              <p className="fw-medium">Last Name</p>
              <FormInputs
                type="text"
                id="lastName"
                label="Enter Name"
                placeholder="Enter Name"
                name="lastName"
                className=" w-100"
                register={register}
                validateFields={validateFields?.lastName}
                errors={errors.lastName}
              />
            </div>
          </div>
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
          <div className="position-relative mt-4">
            {" "}
            <p className="fw-medium">Confirm Password</p>{" "}
            <FormInputs
              type={confirmReveal ? "text" : "password"}
              id="password"
              label="Confirm your Password"
              placeholder="Confirm Password"
              name="password"
              register={register}
              validateFields={validateFields?.confirmPassword}
              errors={errors.confirmPassword}
            />{" "}
            <Texts
              className="position-absolute top-50 end-0 translate-middle cursor"
              text={confirmReveal ? <FaRegEyeSlash /> : <FaRegEye />}
              onClick={handleConfirmHide}
            />{" "}
          </div>
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mt-3">
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={
                  <>
                    I agree to{" "}
                    <span style={{ color: "var(--bg-green-200)" }}>
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span style={{ color: "var(--bg-green-200)" }}>
                      Privacy policies
                    </span>
                  </>
                }
                {...register("terms", {
                  required: "You must accept the terms",
                })}
              />
              {errors.terms && (
                <Form.Text className="text-danger">
                  {errors.terms.message || "Please accept the terms"}
                </Form.Text>
              )}
            </div>
          ))}
          <ActionButton
            text="Sign up"
            className="mt-3 w-100 btns"
            type="submit"
            pending={isSubmitting}
            disabled={isSubmitting}
          />
          <div className="mt-3 text-center" style={{ fontSize: "1.25rem" }}>
            <Form.Text>
              Already have an account?{" "}
              <span
                className="fw-medium"
                style={{ color: "var(--bg-green-200)" }}
              >
                <Link to="/authorize/login">Sign in</Link>
              </span>
            </Form.Text>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;

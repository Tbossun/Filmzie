import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";


const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "username minimum 5 characters")
        .required("username is required"),
      firstName: Yup.string()
        .min(3, "First name minimum 3 characters")
        .required("First name is required"),
      lastName: Yup.string()
        .min(3, "Last name minimum 3 characters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password minimum 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .min(6, "Confirm password minimum 6 characters")
        .required("Confirm password is required"),
      phoneNumber: Yup.string()
        .min(9, "Phone number minimum 9 characters")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign up success");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.username &&
            signupForm.errors.username !== undefined
          }
          helperText={signupForm.touched.username && signupForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="first name"
          name="firstName"
          fullWidth
          value={signupForm.values.firstName}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.firstName &&
            signupForm.errors.firstName !== undefined
          }
          helperText={
            signupForm.touched.firstName && signupForm.errors.firstName
          }
        />
        <TextField
          type="text"
          placeholder="last name"
          name="lastName"
          fullWidth
          value={signupForm.values.lastName}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.lastName &&
            signupForm.errors.lastName !== undefined
          }
          helperText={signupForm.touched.lastName && signupForm.errors.lastName}
        />
        <TextField
          type="text"
          placeholder="Email Address"
          name="email"
          fullWidth
          value={signupForm.values.email}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.email && signupForm.errors.email !== undefined
          }
          helperText={signupForm.touched.email && signupForm.errors.email}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword !== undefined
          }
          helperText={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword
          }
        />
        <TextField
          type="text"
          placeholder="Phone number"
          name="phoneNumber"
          fullWidth
          value={signupForm.values.phoneNumber}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.phoneNumber &&
            signupForm.errors.phoneNumber !== undefined
          }
          helperText={
            signupForm.touched.phoneNumber && signupForm.errors.phoneNumber
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}>
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
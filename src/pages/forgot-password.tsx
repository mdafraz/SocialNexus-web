import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import login from "./login";
import { useMutation } from "urql";
import { ForgotPasswordDocument } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setcomplete] = useState(false);
  const [, forgotpassword] = useMutation(ForgotPasswordDocument);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotpassword(values);
          setcomplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>check your email to change password</Box>
          ) : (
            <Form>
              <InputField
                name="email"
                label="Email"
                placeholder="email"
                type="email"
              />

              <Button
                mt={4}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Forgot Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

//get both email or username for forgot password page

import React from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { LoginDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface registerProps {}
const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useMutation(LoginDocument);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (
            response.data?.login.user &&
            typeof router.query.next === "string"
          ) {
            router.push(router.query.next);
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="username or email"
              placeholder="username or email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                label="password"
                placeholder="Password"
                type="password"
              />
            </Box>
            <Flex mt={2}>
              <Link ml="auto" as={NextLink} href="/forgot-password" mr={2}>
                Forgot password?
              </Link>
            </Flex>

            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export { Login };
export default withUrqlClient(createUrqlClient)(Login);
//what is id in the input field
//to make actual graphql request we are gonna use urql
//graphql code genrator is gonna look at our queries and generate typeScript types for us and generate urql hooks
//formik has setError
//how to push next to the desired page after login after

import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { RegisterDocument } from "../generated/graphql";
import { createUrqlClient } from "../utils/CreateUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useMutation(RegisterDocument);
  return (
    //@ts-expect-error
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          //why not working without {}
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            //worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Box mt={4}>
              <InputField name="email" label="Email" placeholder="Email" />
            </Box>

            <Box mt={4}>
              <InputField
                name="password"
                label="password"
                placeholder="Password"
                type="password"
              />
            </Box>

            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export { Register };
export default withUrqlClient(createUrqlClient)(Register);
//what is id in the input field
//to make actual graphql request we are gonna use urql
//graphql code genrator is gonna look at our queries and generate typeScript types for us and generate urql hooks
//formik has setError
//what is server side render pages
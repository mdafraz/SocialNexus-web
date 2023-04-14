//this is how we name a file when we want a variable in the url that is going to change
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import login from "../login";
import { useMutation } from "urql";
import { ChangePasswordDocument } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/CreateUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  const [, changePassword] = useMutation(ChangePasswordDocument);
  return (
    //@ts-expect-error
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token,
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            //worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New password"
              placeholder="new Password"
              type="password"
            />
            {tokenError ? (
              <Flex>
                <Box color="red" mr={2}>
                  {tokenError}
                </Box>
                <Link as={NextLink} href="/forgot-password" mr={2}>
                  click here to get a new one
                </Link>
              </Flex>
            ) : null}
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export { ChangePassword };
export default withUrqlClient(createUrqlClient)(ChangePassword);

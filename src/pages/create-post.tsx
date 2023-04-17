import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { CreatePostDocument } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  //why adding router in useEffect

  const [, createPost] = useMutation(CreatePostDocument);
  return (
    //@ts-expect-error
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="title" placeholder="title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                label="text"
                placeholder="text..."
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export { CreatePost };
export default withUrqlClient(createUrqlClient)(CreatePost);
//we use withUrqlClient so that we have access to the urql client and we do mutation

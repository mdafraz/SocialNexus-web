import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import router, { useRouter } from "next/router";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import createPost from "../../create-post";
import { useMutation, useQuery } from "urql";
import { PostDocument, UpdatePostDocument } from "../../../generated/graphql";

const EditPost = ({}) => {
  const router = useRouter();
  const [, updatePost] = useMutation(UpdatePostDocument);
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useQuery({
    pause: intId === -1,
    query: PostDocument,
    variables: { id: intId },
  });
  if (fetching) {
    return (
      //@ts-expect-error
      <Layout>
        <div>loading...</div>;
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      //@ts-expect-error
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }
  return (
    //@ts-expect-error
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          //   const { error } = await createPost({ input: values });
          //   if (!error) {
          //     router.push("/");
          //   }

          updatePost({ id: intId, ...values });
          router.back();
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
              update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);

//router.push()
//router.back()

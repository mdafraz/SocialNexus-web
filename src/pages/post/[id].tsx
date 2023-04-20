import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import { Query, useQuery } from "urql";
import { PostDocument } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/react";

export const Post = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useQuery({
    pause: intId === -1,
    query: PostDocument,
    variables: { id: intId },
  });

  if (fetching) {
    //@ts-expect-error
    <Layout>
      <div>Loading...</div>
    </Layout>;
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
      <Heading mb={4}>{data.post.title}</Heading>
      {data.post.text}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(Post);

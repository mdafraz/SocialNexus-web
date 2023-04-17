import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useQuery } from "urql";
import { Layout } from "../components/Layout";
import { PostsDocument } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching, stale }] = useQuery({
    query: PostsDocument,
    variables: variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }
  return (
    //@ts-expect-error
    <Layout variant="regular">
      <Flex align="center">
        <Heading>Reddit</Heading>
        <Link ml="auto" as={NextLink} href="/create-post" mr={2}>
          create Post
        </Link>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} direction="column">
          {data!.posts.posts.map((p) => (
            <Box p={5} shadow="md" borderWidth="1px" key={p.id}>
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

//for forgot password we will use nodemailer

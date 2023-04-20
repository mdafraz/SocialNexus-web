import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useMutation, useQuery } from "urql";
import { Layout } from "../components/Layout";
import { DeletePostDocument, PostsDocument } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from "@chakra-ui/icons";
import { UpdootSection } from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching, stale }] = useQuery({
    query: PostsDocument,
    variables: variables,
  });

  const [, deletePost] = useMutation(DeletePostDocument);
  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    //@ts-expect-error
    <Layout variant="regular">
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} direction="column">
          {data!.posts.posts.map((p) => (
            <Flex p={5} shadow="md" borderWidth="1px" key={p.id}>
              <Box>
                <UpdootSection post={p} />
              </Box>
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </Link>
                </NextLink>

                <Text>Posted By {p.creator.username}</Text>
                <Flex align="center">
                  <Text mt={4} flex={1}>
                    {p.textSnippet}
                  </Text>
                  <IconButton
                    onClick={() => {
                      deletePost({ id: p.id });
                    }}
                    colorScheme="red"
                    aria-label="Delete Post"
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </Box>
            </Flex>
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

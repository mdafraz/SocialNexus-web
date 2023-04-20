import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostsQuery, VoteDocument } from "../generated/graphql";
import { useMutation } from "urql";

interface UpdootSectionProps {
  post: PostsQuery["posts"]["posts"][0];
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useMutation(VoteDocument);
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mr={4}
    >
      <IconButton
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        aria-label="updoot post"
        onClick={() => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          vote({ postId: post.id, value: 1 });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        aria-label="downdoot post"
        onClick={() => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("updoot-loading");
          vote({ postId: post.id, value: -1 });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};

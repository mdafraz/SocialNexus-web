import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";

import React from "react";
import { useMutation, useQuery } from "urql";
import { DeletePostDocument, MeDocument } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useQuery({
    query: MeDocument,
  });
  const [, deletePost] = useMutation(DeletePostDocument);
  //@ts-expect-error
  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box ml="auto">
      <NextLink as={`/post/edit/${id}`} href="/post/edit/[id]">
        <IconButton mr={4} aria-label="Edit Post" icon={<EditIcon />} />
      </NextLink>
      <IconButton
        onClick={() => {
          deletePost({ id: id });
        }}
        aria-label="Delete Post"
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

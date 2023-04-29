import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: LogoutFetching }, logout] = useMutation(LogoutDocument);
  const [{ data, fetching }] = useQuery({
    query: MeDocument,
    // pause: isServer(),
  });
  // console.log("data", data);

  let body = null;

  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Link as={NextLink} href="/login" mr={2}>
          Login
        </Link>
        <Link as={NextLink} href="/register">
          Register
        </Link>
      </>
    );
    //user is logged in
  } else {
    body = (
      <Flex align="center">
        <Button mr={4} as={Link} href="/create-post">
          create post
        </Button>
        <Box mr={2}>
          {
            //@ts-expect-error
            data.me.username
          }
        </Box>
        <Button
          isLoading={fetching}
          onClick={async () => {
            //@ts-expect-error
            await logout();
          }}
          variant={"link"}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4} align="center">
      <Flex maxW={800} align="center" m="auto" flex={1}>
        <Link as={NextLink} href="/login" mr={2}>
          <Heading>REDDIT</Heading>
        </Link>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;

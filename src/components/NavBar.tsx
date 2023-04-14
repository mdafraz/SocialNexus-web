import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument } from "../generated/graphql";
import { isServer } from "../utils/isServer";
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
      <Flex>
        <Box mr={2}>
          {
            //@ts-expect-error
            data.me.username
          }
        </Box>
        <Button
          isLoading={fetching}
          onClick={() => {
            //@ts-expect-error
            logout();
          }}
          variant={"link"}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default NavBar;

//it is a special nextjs component and using this component we can navigate to pages

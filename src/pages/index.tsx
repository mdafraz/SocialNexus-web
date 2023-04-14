import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/CreateUrqlClient";
import { useQuery } from "urql";
import { PostsDocument } from "../generated/graphql";
import { dedupExchange, cacheExchange, fetchExchange } from "@urql/core";

const Index = () => {
  const [{ data }] = useQuery({
    query: PostsDocument,
  });
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);

//for forgot password we will use nodemailer

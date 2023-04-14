import { fetchExchange } from "urql";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  LogoutMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors || query?.me) {
                  return query;
                }

                return {
                  me: result.login.user,
                };
              }
            );
          },
          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                console.log(result, query);
                if (result.register.errors || query?.me) {
                  return query;
                }

                return {
                  me: result.register.user,
                };
              }
            );
          },
          logout: (_result, _args, cache, _info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});

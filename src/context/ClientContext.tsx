import { authExchange } from "@urql/exchange-auth";
import { cacheExchange, DataField } from "@urql/exchange-graphcache";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import {
  createClient,
  dedupExchange,
  makeOperation,
  fetchExchange,
  subscriptionExchange,
  Provider,
} from "urql";
import { Refresh } from "../graphQL/mutations/Refresh";
import {
  Following,
  Followers,
  ViewerActivty,
  ViewerFollowRequests,
  FollowingPosts,
  RecentSearch,
  UniqueChatMessages,
} from "../graphQL/queries";
import { MessageProps } from "../routes/Direct/Chat";
import { UserNamesI } from "../types";
import { getAccessToken, setAccessToken } from "../utils/accessToken";
import { createClient as createWSClient, Client as WsClient } from "graphql-ws";

export interface ClientStateI {
  resetClient: () => void;
}

interface Props {
  children: React.ReactNode;
}

const makeWsClient = () =>
  createWSClient({
    url: "wss://john-denny-social-media-api.onrender.com",
    connectionParams: async () => {
      const authToken = getAccessToken();
      while (!authToken)
        await new Promise((resolve) => setTimeout(resolve, 500));
      return { authentication: authToken };
    },
  });

const makeClient = (WsClient: WsClient) =>
  createClient({
    url: "https://john-denny-socail-media-api.onrender.com",
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          counts: () => null,
          postCounts: () => null,
        },
        resolvers: {},
        optimistic: {
          savePost(args, cache, info) {
            return {
              __typename: "Post",
              id: args.postId,
              isSaved: true,
            };
          },
          unsavePost(args, cache, info) {
            return {
              __typename: "Post",
              id: args.postId,
              isSaved: false,
            };
          },
          like(args, cache, info) {
            return {
              __typename: "Post",
              id: args.postId,
              isLiked: true,
            };
          },
          unlike(args, cache, info) {
            return {
              __typename: "Post",
              id: args.postId,
              isLiked: false,
            };
          },
          commentLike(args, cache, info) {
            return {
              __typename: "Comment",
              id: args.commentId,
              isLiked: true,
            };
          },
        },
        updates: {
          Mutation: {
            removeTag(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "tags")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            hideTag(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "tags")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            showTag(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "tags")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            editUser(result, args, cache, info) {
              cache.invalidate("Query", "activityPage");
            },
            logout(result, args, cache, info) {
              cache.invalidate("Query", "viewer");
            },
            createCollection(result, args, cache, info) {
              cache.invalidate("Query", "viewer");
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "collectionsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "savedPostsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            deleteCollection(result, args, cache, info) {
              cache.invalidate("Query", "viewer");
              cache
                .inspectFields("Query")
                .filter(
                  (field) =>
                    field.fieldName === "uniqueCollection" &&
                    field.arguments?.collectionId === args.collectionId
                )
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "collectionsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "savedPostsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            sharePost(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "chatPagedMessages")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerChatsPaged")
                .forEach((field) =>
                  cache.invalidate("Query", field.fieldName, field.arguments)
                );
            },
            follow(result, args, cache, info) {
              const username = (
                result.follow as { follower: { username: string } }
              )?.follower.username;
              cache.updateQuery(
                {
                  query: Following,
                  variables: { limit: 16, skip: 0, username },
                },
                (data: any) => {
                  if (data)
                    data.following.profiles = data.following.profiles.push(
                      (result.follow as { following: UserNamesI })?.following
                    );
                  return data;
                }
              );
            },
            unfollow(result, args, cache, info) {
              const username = (
                result.unfollow as { follower: { username: string } }
              )?.follower.username;
              console.log(cache.inspectFields("Query"), username);
              cache
                .inspectFields("Query")
                .filter(
                  (feild) =>
                    feild.fieldName === "following" &&
                    feild.arguments?.username === username
                )
                .forEach((feild) => {
                  cache.updateQuery(
                    {
                      query: Following,
                      variables: { ...feild.arguments },
                    },
                    (data: any) => {
                      console.log(data);
                      if (data)
                        data.following.profiles =
                          data.following.profiles.filter(
                            (profile: UserNamesI) =>
                              profile.username !== args.username
                          );
                      return data;
                    }
                  );
                });
            },
            removeFollower(result, args, cache, info) {
              const username = (
                result.removeFollower as { following: { username: string } }
              )?.following.username;
              cache
                .inspectFields("Query")
                .filter(
                  (feild) =>
                    feild.fieldName === "followers" &&
                    feild.arguments?.username === username
                )
                .forEach((feild) => {
                  cache.updateQuery(
                    {
                      query: Followers,
                      variables: { ...feild.arguments },
                    },
                    (data: any) => {
                      if (data)
                        data.followers.profiles =
                          data.followers.profiles.filter(
                            (profile: UserNamesI) =>
                              profile.id !== args.followerId
                          );
                      return data;
                    }
                  );
                });
              cache
                .inspectFields("Query")
                .filter((feild) => feild.fieldName === "activityPage")
                .forEach((feild) => {
                  cache.updateQuery(
                    {
                      query: ViewerActivty,
                      variables: { ...feild.arguments },
                    },
                    (data: any) => {
                      if (data)
                        data.activityPage.activity =
                          data.activityPage.activity.filter(
                            (activity: { sentBy: { id: number } }) =>
                              activity.sentBy.id !== args.followerId
                          );
                      return data;
                    }
                  );
                });
            },
            removeFollowRequest(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((feild) => feild.fieldName === "followRequests")
                .forEach((feild) => {
                  cache.updateQuery(
                    {
                      query: ViewerFollowRequests,
                      variables: { ...feild.arguments },
                    },
                    (data: any) => {
                      if (data)
                        data.followRequests.profiles =
                          data.followRequests.profiles.filter(
                            (profile: UserNamesI) =>
                              profile.id !== args.requestId
                          );
                      return data;
                    }
                  );
                });
              cache
                .inspectFields("Query")
                .filter(
                  (feild) =>
                    feild.fieldName === "activityPage" &&
                    feild.arguments?.skip === 0
                )
                .forEach((feild) => {
                  cache.updateQuery(
                    { query: ViewerActivty, variables: { ...feild.arguments } },
                    (data: any) => {
                      if (data) {
                        data.activityPage.followRequests =
                          data.activityPage.followRequests.filter(
                            (profile: UserNamesI) =>
                              profile.id !== args.requestId
                          );
                        data.activityPage.activityCounts.totalFollowRequests =
                          data.activityPage.activityCounts.totalFollowRequests -
                          1;
                      }
                      return data;
                    }
                  );
                });
            },
            confirmFollowRequest(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((feild) => feild.fieldName === "followRequests")
                .forEach((feild) => {
                  cache.updateQuery(
                    {
                      query: ViewerFollowRequests,
                      variables: { ...feild.arguments },
                    },
                    (data: any) => {
                      data.followRequests.profiles =
                        data.followRequests.profiles.filter(
                          (profile: UserNamesI) => profile.id !== args.requestId
                        );
                      return data;
                    }
                  );
                });
              cache
                .inspectFields("Query")
                .filter((feild) => feild.fieldName === "activityPage")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              const username = (
                result.confirmFollowRequest as {
                  following: { username: string };
                }
              )?.following.username;
              console.log({ username });
              cache.updateQuery(
                {
                  query: Followers,
                  variables: { limit: 16, skip: 0, username },
                },
                (data: any) => {
                  console.log({ data });
                  if (data)
                    data.followers.profiles = data.followers.profiles.push(
                      (result.confirmFollowRequest as { follower: UserNamesI })
                        ?.follower
                    );
                  return data;
                }
              );
            },
            hideUser(result, args, cache, info) {
              cache.invalidate({
                __typename: "User",
                id: args.id as string,
              });
            },
            newChat(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerSoloChats")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            reply(result, args, cache, info) {
              cache.invalidate({
                __typename: "Comment",
                id: args.commentId as string,
              });
            },
            comment(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((feild) => feild.fieldName === "commentsPage")
                .forEach((feild) =>
                  cache.invalidate("Query", feild.fieldName, feild.arguments)
                );
              cache
                .inspectFields("Query")
                .filter((feild) => feild.fieldName === "followingPosts")
                .forEach((feild) => {
                  cache.updateQuery(
                    {
                      query: FollowingPosts,
                      variables: { ...feild.arguments },
                    },
                    (data: any) => {
                      const index = data.followingPosts.posts.findIndex(
                        (post: any) => post.id === args.postId
                      );
                      data.followingPosts.posts[index].featuredComments.push(
                        result.comment
                      );
                      return data;
                    }
                  );
                });
            },
            addHashTagSearch(result, args, cache, info) {
              cache.updateQuery(
                {
                  query: RecentSearch,
                },
                (data: { recentSearch: DataField[] } | null) => {
                  if (data) data.recentSearch?.unshift(result.addHashTagSearch);
                  return data;
                }
              );
            },
            addUserSearch(result, args, cache, info) {
              cache.updateQuery(
                {
                  query: RecentSearch,
                },
                (data: { recentSearch: DataField[] } | null) => {
                  if (data) data.recentSearch?.unshift(result.addUserSearch);
                  return data;
                }
              );
            },
            savePost(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "savedPostsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "collectionsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            unsavePost(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "savedPostsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "collectionsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            addCollectionPosts(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "collectionsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "uniqueCollection")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            deleteCollectionPosts(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "collectionsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "uniqueCollection")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            deletePost(result, args, cache, info) {
              cache.invalidate({
                __typename: "Post",
                id: args.postId as string,
              });
            },
            deleteComment(result, args, cache, info) {
              cache.invalidate({
                __typename: "Comment",
                id: args.commentId as any,
              });
            },
            deleteReply(result, args, cache, info) {
              const deleteReply = result.deleteReply as {
                commentId: string;
                replyId: string;
              };
              cache.invalidate({
                __typename: "Comment",
                id: deleteReply?.commentId,
              });
              cache.invalidate({
                __typename: "Reply",
                id: args.replyId as any,
              });
            },
            deleteMessage(result, args, cache, info) {
              cache.invalidate({
                __typename: "Message",
                id: args.messageId as string,
              });
            },
            message(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter(
                  (field) =>
                    field.fieldName === "chatPagedMessages" &&
                    field.arguments?.chatId === args.chatId &&
                    field.arguments?.skip === 0
                )
                .forEach((field) => {
                  cache.updateQuery(
                    {
                      query: UniqueChatMessages,
                      variables: field.arguments,
                    },
                    (data: any) => {
                      if (data)
                        data.chatPagedMessages.messages.push(result.message);
                      return data;
                    }
                  );
                });

              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            deleteChat(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerSoloChats")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            acceptChat(result, args, cache, info) {
              console.log({ args });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerSoloChats")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "requestChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache.invalidate("Query", "uniqueChat", args);
            },
            removeChatRequest(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "requestChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache.invalidate("Query", "uniqueChat", args);
            },
            removeAllChatRequests(result, args, cache, info) {
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "requestChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            removeHashTagSearch(result, args, cache, info) {
              cache.invalidate({
                __typename: "RecentSearch",
                id: args.hashTagName as string,
              });
            },
            removeUserSearch(result, args, cache, info) {
              cache.invalidate({
                __typename: "RecentSearch",
                id: args.userId as string,
              });
            },
            clearRecentSearch(result, args, cache, info) {
              cache.invalidate("Query", "recentSearch");
            },
            unlikeMessage(
              result: { unlikeMessage: MessageProps },
              args,
              cache,
              info
            ) {
              cache.invalidate({
                __typename: "Chat",
                id: result.unlikeMessage.chatId,
              });
            },
          },
          Subscription: {
            newMessage: (result, args, cache, info) => {
              console.log(cache.inspectFields("Query"));
              cache
                .inspectFields("Query")
                .filter(
                  (field) =>
                    field.fieldName === "chatPagedMessages" &&
                    field.arguments?.chatId === args.chatId
                )
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
              cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "viewerChatsPaged")
                .forEach((field) => {
                  cache.invalidate("Query", field.fieldName, field.arguments);
                });
            },
            deletedMessage: (
              result: { deletedMessage: { id: string } },
              args,
              cache,
              info
            ) => {
              cache.invalidate({
                __typename: "Message",
                id: result.deletedMessage?.id,
              });
            },
            newActivity: (result, args, cache, info) => {
              cache
                .inspectFields("Query")
                .filter((feild) => feild.fieldName === "followRequests")
                .forEach((feild) =>
                  cache.invalidate("Query", feild.fieldName, feild.arguments)
                );
            },
            readMessage: (result, args, cache, info) => {
              console.log(result);
            },
          },
        },
      }),
      authExchange({
        getAuth: async ({ authState, mutate }: any) => {
          if (!authState) {
            const token = getAccessToken();
            if (token) {
              return { token };
            }
            const result = await mutate(Refresh, {});

            if (result.data?.refresh_token) {
              setAccessToken(result.data.refresh_token.accessToken);
              return {
                token: result.data.refresh_token.accessToken,
              };
            }
          }
          const token = getAccessToken();
          if (!token) {
            const result = await mutate(Refresh, {});
            console.log("Token Expired");
            if (result.data?.refresh_token) {
              setAccessToken(result.data.refresh_token.accessToken);
              return {
                token: result.data.refresh_token.accessToken,
              };
            }
          }
          // This is where auth has gone wrong and we need to clean up and redirect to a login page
          // logout();
          return null;
        },
        willAuthError: ({ authState }) => {
          if (!authState) {
            return true;
          }
          const token = getAccessToken();
          try {
            const decodedToken: JwtPayload = jwt_decode(token);
            if ((decodedToken?.exp as JwtPayload) < Date.now() / 1000) {
              setAccessToken("");
              return true;
            } else {
              return false;
            }
          } catch (error) {
            return true;
          }
          // e.g. check for expiration, existence of auth etc
        },
        didAuthError: ({ error }) => {
          // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
          console.log(error);
          return error.graphQLErrors.some(
            (e) => e.extensions?.code === "FORBIDDEN"
          );
        },
        addAuthToOperation: ({ authState, operation }) => {
          if (!authState || !authState.token) {
            return operation;
          }

          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};

          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: `Bearer ${authState.token}`,
              },
              credentials: "include",
            },
          });
        },
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: WsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
    fetchOptions: () => {
      return {
        credentials: "include",
      };
    },
  });

export const ClientContext = createContext<ClientStateI | null>(null);

export const ClientProvider = ({ children }: Props) => {
  const WsClient = makeWsClient();
  const [client, setClient] = useState(makeClient(WsClient));

  return (
    <ClientContext.Provider
      value={{ resetClient: () => setClient(makeClient(WsClient)) }}
    >
      <Provider value={client}>{children}</Provider>
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);

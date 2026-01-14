import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import authStorage from "../lib/authStorage";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  // uri: "https://eaxi.axra.app/v1/graphql",
  uri: "https://sevenbros.axratech.com/v1/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  //clear jwt if expired
  if (graphQLErrors) {
    console.log("[graphQLErrors]", graphQLErrors);
    
    // Don't show alert for duplicate errors (handled by toast notifications)
    graphQLErrors.forEach(({ extensions, message }) => {
      const errorCode = extensions?.code;
      
      // Skip alerts for errors that are handled with toast notifications
      if (errorCode === "DUPLICATE_DRIVER_ID" || 
          errorCode === "DUPLICATE_PHONE" ||
          message?.includes("already in use")) {
        return; // Skip alert, toast will handle it
      }
      
      // Only show alert for session expiration
      if (errorCode === "invalid-jwt") {
        authStorage.clearToken();
        alert("Session Expired, Please Sign In With Your Credentials Again");
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    alert("network connection problem");
  }
});

const createApolloClient = () => {

  const authLink = setContext(async (_, {headers}) => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        return {
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        };
      } else {
        return {
          headers,
        };
      }
    } catch (e) {
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: errorLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

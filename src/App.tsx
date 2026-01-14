import "./App.css";
import createApolloClient from "../src/graphql/apolliClient";
import {
  APIProvider,
} from "@vis.gl/react-google-maps";
import { RouterProvider } from "react-router-dom";

import useAppRouter from "./routers/main-routes";
import { ApolloProvider } from "@apollo/client";

function App() {
  const apolloClient = createApolloClient();
  const router = useAppRouter();

  return (
    <APIProvider
    apiKey={"AIzaSyDP2UHQRlcWCm-1VNOCJfXFUmLQM4bVJ0E"}
    onLoad={() => console.log("Maps API has loaded.")}
  >
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
    </APIProvider>
  );
}

export default App;

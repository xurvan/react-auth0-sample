import { createRoot } from "react-dom/client";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    !isAuthenticated && <button onClick={loginWithRedirect}>Log in</button>
  );
}

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated && <div>Hello {user.name}</div>;
}

function App() {
  const { isLoading, error } = useAuth0();

  // Wait for the SDK to initialize and handle any errors
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <>
      <Profile />
      <LoginButton />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-p78arxi4c75zw3df.eu.auth0.com"
    clientId="RNcjpTpFWUXk3oVHo9r4vFjwJNRgy0U8"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://reqres.in/",
    }}
  >
    <App />
  </Auth0Provider>,
);

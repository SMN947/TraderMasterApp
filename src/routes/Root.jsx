import { Link, Outlet, useFetcher, useRouteLoaderData, } from "react-router-dom";
import { getRequest } from "../services/request";
import { useEffect } from "react";

  function Root() {
    return (
      <div>
        <h1>SMN947 TraderMaster</h1>
  
        <AuthStatus />
  
        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
  
        <Outlet />
      </div>
    );
  }
  
  function AuthStatus() {
    useEffect(()=>{
      getRequest('API/v1/User/').then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
    },[])

    // Get our logged in user, if they exist, from the root route loader data
    let { user } = useRouteLoaderData("root");
    let fetcher = useFetcher();
  
    if (!user) {
      return <p>You are not logged in.</p>;
    }
  
    let isLoggingOut = fetcher.formData != null;
  
    return (
      <div>
        <p>Welcome {user}!</p>
        <fetcher.Form method="post" action="/logout">
          <button type="submit" disabled={isLoggingOut}>
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </fetcher.Form>
      </div>
    );
  }
  
  export {Root, AuthStatus}
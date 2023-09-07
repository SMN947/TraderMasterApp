import { redirect, } from "react-router-dom";
import { authService } from "../services/auth";

function DashboardLoader({ request }) {
  if (!authService.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

function Dashboard() {
  return <h3>Protected</h3>;
}

export { Dashboard, DashboardLoader}
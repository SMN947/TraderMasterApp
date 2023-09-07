import { Form, redirect, useActionData, useLocation, useNavigation, } from "react-router-dom";
import { authService } from "../services/auth";
  
  async function loginAction({ request }) {
    let formData = await request.formData();

    try {
        await authService.signin();
    } catch (error) {
        return {
            error: "Invalid login attempt",
        };
    }

    let redirectTo = formData.get("redirectTo");
    return redirect(redirectTo || "/");
}

async function loginLoader() {
    if (authService.isAuthenticated) {
        return redirect("/");
    }
    return null;
}

function LoginPage() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    let navigation = useNavigation();
    let isLoggingIn = authService.formData?.get("username") != null;

    let actionData = useActionData();

    return (
        <div>
            <p>You must log in to view the page at {from}</p>

            {
                JSON.stringify(authService)
            }

            <Form method="post" replace>
                <input type="hidden" name="redirectTo" value={from} />
                <button type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? "Logging in..." : "Login"}
                </button>
                {actionData && actionData.error ? (
                    <p style={{ color: "red" }}>{actionData.error}</p>
                ) : null}
            </Form>
        </div>
    );
}

export { LoginPage, loginAction, loginLoader }
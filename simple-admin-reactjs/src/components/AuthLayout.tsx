import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { AuthProvider } from "../hooks/useAuth";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData() as { userPromise: () => Promise<any> };

  return (
    <Suspense fallback={<LinearProgress />}>
      <Await
        resolve={ userPromise }
        errorElement={<Alert severity="error">Something went wrong!</Alert>}
        children={(user) => {
          return <AuthProvider userData={user}>{outlet}</AuthProvider>
        }
          
        }
      />
    </Suspense>
  );
};

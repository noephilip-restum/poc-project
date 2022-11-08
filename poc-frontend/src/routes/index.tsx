import { ElementType, lazy, Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import MainLayout from "layouts/MainLayout";
import { MAIN_PATH } from "./paths";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

const HomePage = Loadable(lazy(() => import("pages/HomePage")));
const MovieExplore = Loadable(lazy(() => import("pages/MovieExplore")));
const ActorExplore = Loadable(lazy(() => import("pages/ActorExplore")));
const Login = Loadable(lazy(() => import("pages/Login")));
const SignUp = Loadable(lazy(() => import("pages/SignUp")));
const AdminPage = Loadable(lazy(() => import("pages/AdminPage")));
const ProtectedRoutes = Loadable(lazy(() => import("./ProtectedRoutes")));

export default function MainRoutes() {
  let routes = useRoutes([
    {
      path: MAIN_PATH.login,
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: MAIN_PATH.signup,
      children: [{ path: "", element: <SignUp /> }],
    },
    {
      path: MAIN_PATH.browse,
      element: <MainLayout />,
      children: [
        {
          children: [{ path: "", element: <HomePage /> }],
        },
        {
          children: [{ path: "movies", element: <MovieExplore /> }],
        },
        {
          children: [{ path: "actors", element: <ActorExplore /> }],
        },
      ],
    },

    {
      path: MAIN_PATH.admin,
      element: <ProtectedRoutes />,
      children: [
        {
          path: MAIN_PATH.admin,
          children: [
            { path: "", element: <AdminPage /> },
            { path: "users", element: <AdminPage /> },
            { path: "actors", element: <AdminPage /> },
            { path: "movies", element: <AdminPage /> },
            { path: "reviews", element: <AdminPage /> },
          ],
        },
      ],
    },
    {
      path: MAIN_PATH.root,
      element: <Navigate to={MAIN_PATH.browse} replace />,
    },
    {
      path: MAIN_PATH.notFound,
      element: <Navigate to={MAIN_PATH.login} replace />,
    },
  ]);
  return routes;
}

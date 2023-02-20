import { Home, Login, Profile, Register } from "./pages";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./components";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux/authSlice";


function App() {
  const token = useSelector(selectCurrentToken);

  const routes = [
    {
      path: "login",
      element: <Login />,
      isOnlyUnauthorized: true,
    },
    {
      path: "register",
      element: <Register />,
      isOnlyUnauthorized: true,
    },
    {
      path: "*",
      element: <Home />,
      isOnlyAuthorized: true,
    },
    {
      path: "profile/:id",
      element: <Profile />,
      isOnlyAuthorized: true,
    },
  ]

  const location = useLocation();


  if (token && routes.find(r => `/${r.path}` === location.pathname)?.isOnlyUnauthorized) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (!token && routes.find(r => `/${r.path}` === location.pathname)?.isOnlyAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }


  return (
    <Routes>
      {/* public routes */}
      {routes.map(route => {
        if (route.isOnlyUnauthorized) {
          return <Route key={route.path} path={route.path} element={route.element} />
        }
      })}
      <Route element={<RequireAuth routes={routes} />}>
        {routes.map(route => {
          if (route.isOnlyAuthorized) {
            return <Route key={route.path} path={route.path} element={route.element} />
          }
        })}
      </Route>
    </Routes >
  );
}

export default App;

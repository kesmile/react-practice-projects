import SignUp from './pages/SignUp';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, defer } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css'
import { AuthLayout } from './components/AuthLayout';
import { ProtectedLayout } from './components/ProtectedLayout';
import { PublicLayout } from './components/PublicLayout';
import Home from './pages/Home';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: { main: "#3a34d2" }
  }
});

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user');
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} loader={() => defer({ userPromise: getUserData() })}>
      <Route element={<PublicLayout />}>
        <Route path="/login" Component={Login} ></Route>
        <Route path="/register" Component={SignUp} ></Route>
      </Route>
      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="home" Component={Home}></Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

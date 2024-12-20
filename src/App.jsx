import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Repos from "./components/Repos";
import Preview from "./components/Preview";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Welcome from "./components/Welcome";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/repos" element={<Repos />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/error" element={<Error />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

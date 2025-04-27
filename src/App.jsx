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
import SharedPreview from "./components/SharedPreview";
import About from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import DonateUs from "./components/DonateUs";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
          }}
          basename="/"
        >
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
              <Route
                path="/preview/:username/shared"
                element={<SharedPreview />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/donate" element={<DonateUs />} />
            </Route>
          </Routes>
          <Routes></Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

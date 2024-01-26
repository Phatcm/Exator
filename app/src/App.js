import { Route, Routes, useNavigate } from "react-router-dom";
import TestPage from "./pages/test/TestPage";
import DashBoardPage from "./pages/dashboard/DashBoardPage";
import NavigationMenu from "./component/navigation-menu/NavigationMenu";
import Header from "./component/header/Header";
import MyLibrary from "./pages/my-library/MyLibrary";
import User from "./pages/dashboard/user/User";
import NotFound from "./pages/notfound/NotFound";
import Theme from "./pages/dashboard/theme/Theme";
import MyTheme from "./pages/my-library/my-theme/MyTheme";
import { useDispatch, useSelector } from "react-redux";
import Exam from "./pages/test/take-exam/Exam";
import History from "./pages/test/history/History";
import Favorite from "./pages/favorite/Favorite";
import ReviewHistory from "./pages/test/history/review-history/ReviewHistory";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Loading from "./component/loading/Loading";
import Cookies from "js-cookie";
import { setUser } from "./redux/userSlice";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const url = `${process.env.REACT_APP_URL_USER}/user/isLoggedIn`;
      const jwt = Cookies.get("jwt");
      if (!jwt) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt}`, // No "Bearer" prefix
              "Content-Type": "application/json", // Adjust the content type as needed
            },
          }
        );
        if (response.status === 200) {
          const userData = response.data.body.user;
          dispatch(setUser(userData));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <Fragment>
      {!user.email && !Cookies.get("jwt") ? (
        !loading ? (
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/resetPassword" element={<ResetPassword />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <Loading size={"xl"}></Loading>
          </div>
        )
      ) : (
        <div className="p-4 bg-[#eff7f9] w-[100vw] h-[100vh] flex">
          <NavigationMenu></NavigationMenu>
          <div className="ml-4 flex-1">
            <div className="h-[60px]">
              <Header></Header>
            </div>
            <div className="h-[calc(100%-76px)] mt-4">
              <Routes>
                <Route path="/dashboard" element={<DashBoardPage />} />
                <Route path="/test/maketest" element={<TestPage />} />
                <Route path="/test/exam" element={<Exam />} />
                <Route path="/test/history" element={<History />} />
                <Route path="/test/history/:id" element={<ReviewHistory />} />
                <Route path="/mylibrary" element={<MyLibrary />} />
                <Route path="/dashboard/:user" element={<User />} />
                <Route path="/dashboard/:user/:theme" element={<Theme />} />
                <Route path="/mylibrary/:theme" element={<MyTheme />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/*" element={<DashBoardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </Fragment>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import TestPage from "./pages/test/TestPage";
import DashBoardPage from "./pages/dashboard/DashBoardPage";
import NavigationMenu from "./component/navigation-menu/NavigationMenu";
import Header from "./component/header/Header";
import MyLibrary from "./pages/my-library/MyLibrary";
import User from "./pages/dashboard/user/User";
import NotFound from "./pages/notfound/NotFound";
import Theme from "./pages/dashboard/theme/Theme";
import MyTheme from "./pages/my-library/my-theme/MyTheme";
import { useSelector } from "react-redux";
import Exam from "./pages/test/take-exam/Exam";
import History from "./pages/test/history/History";
import Favorite from "./pages/favorite/Favorite";
import ReviewHistory from "./pages/test/history/review-history/ReviewHistory";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);

  return !user.email ? (
    <div className={``}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/*" element={<SignIn />} />
      </Routes>
    </div>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/adminstration/AdminPage";
import TestPage from "./pages/test/TestPage";
import HistoryPage from "./pages/history/HistoryPage";
import DashBoardPage from "./pages/dashboard/DashBoardPage";
import NavigationMenu from "./component/navigation-menu/NavigationMenu";
import Header from "./component/header/Header";
import MyLibrary from "./pages/my-library/MyLibrary";
import User from "./pages/dashboard/user/User";
import NotFound from "./pages/notfound/NotFound";
import Theme from "./pages/dashboard/theme/Theme";
import MyTheme from "./pages/my-library/my-theme/MyTheme";

function App() {
  return (
    <div className="p-4 bg-[#eff7f9] w-[100vw] h-[100vh] flex">
      <NavigationMenu></NavigationMenu>
      <div className="ml-4 flex-1">
        <div className="h-[60px]">
          <Header></Header>
        </div>
        <div className="h-[calc(100%-76px)] mt-4">
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/mylibrary" element={<MyLibrary />} />
            <Route path="/dashboard/:user" element={<User />} />
            <Route path="/dashboard/:user/:theme" element={<Theme />} />
            <Route path="/mylibrary/:theme" element={<MyTheme />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

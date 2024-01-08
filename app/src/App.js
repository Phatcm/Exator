import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/adminstration/AdminPage";
import TestPage from "./pages/test/TestPage";
import HistoryPage from "./pages/history/HistoryPage";
import DashBoardPage from "./pages/dashboard/DashBoardPage";
import NavigationMenu from "./component/navigation-menu/NavigationMenu";
import Header from "./component/header/Header";
import MyLibrary from "./pages/my-library/MyLibrary";
import User from "./pages/user/User";
import Theme from "./pages/theme/Theme";
import NotFound from "./pages/notfound/NotFound";

function App() {
  return (
    <div className="p-4 bg-[#eff7f9] w-[100vw] h-[100vh] flex">
      <NavigationMenu></NavigationMenu>
      <div className="ml-4 flex-1">
        <div className="h-[60px]">
          <Header></Header>
        </div>
        <div className="h-[calc(100%-60px)]">
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/mylibrary" element={<MyLibrary />} />
            <Route path="/dashboard/:user" element={<User />} />
            <Route path="/dashboard/:user/:theme" element={<Theme />} />
            <Route path="/dashboard/:user/:theme" element={<Theme />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

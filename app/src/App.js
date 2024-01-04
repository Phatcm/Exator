import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/adminstration/AdminPage";
import TestPage from "./pages/test/TestPage";
import HistoryPage from "./pages/history/HistoryPage";
import DashBoardPage from "./pages/dashboard/DashBoardPage";
import NavigationMenu from "./component/navigation-menu/NavigationMenu";
import Header from "./component/header/Header";

function App() {
  return (
    <div className="p-4 bg-[#eff7f9] w-[100vw] h-[100vh] flex">
      <NavigationMenu></NavigationMenu>
      <div className="ml-4 flex-1">
        <Header></Header>
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

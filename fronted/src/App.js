import Signup from "./pages/SignupScreen";
import Login from "./pages/Login";
import ResetPasswordScreen from "./pages/ResetPasswordScreen";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyRecipes from "./pages/MyRecipes";
import MyFavorite from "./pages/MyFavorite";
import AboutUs from "./pages/AboutUs";
import Error from "./pages/Error";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Recipe from "./pages/RecipeScreen";
import Logout from "./pages/LogOut";
import { getCurrentUser } from "./services/userService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = getCurrentUser();
  return (
    <div>
      <NavBar user={user} />
      <ToastContainer />
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MyRecipes" element={<MyRecipes />} />
          <Route path="/MyFavorite" element={<MyFavorite />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassword" element={<ResetPasswordScreen />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

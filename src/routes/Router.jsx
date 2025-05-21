import { createBrowserRouter } from "react-router";
import HomeLayouts from "../layouts/HomeLayouts";
import Home from "../pages/Home";
import MyRecipes from "../pages/MyRecipes";
import AddRecipe from "../pages/AddRecipe";
import AllRecipes from "../pages/AllRecipes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayouts from "../layouts/AuthLayouts";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayouts></HomeLayouts>,
        children: [
            {
                path: "/",
                index: true,
                element: <Home />,
            },
            {
                path: "/all-recipes",
                element: <AllRecipes />,
            },
            {
                path: "/add-recipe",
                element: <AddRecipe />,
            },
            {
                path: "/my-recipes",
                element: <MyRecipes />,
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayouts></AuthLayouts>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>,
            },
        ],
    },
]);


export default router;
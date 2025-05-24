import { createBrowserRouter } from "react-router";
import HomeLayouts from "../layouts/HomeLayouts";
import Home from "../pages/Home";
import MyRecipes from "../pages/MyRecipes";
import AddRecipe from "../pages/AddRecipe";
import AllRecipes from "../pages/AllRecipes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayouts from "../layouts/AuthLayouts";
import RecipeDetails from "../pages/RecipeDetails";
import PrivateRoute from "../provider/PrivateRoute";
import Loading from "../components/Loading";
import WishList from "../pages/WishList";
import Error from "../pages/Error";

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
                loader: () =>
                    fetch(
                        "https://flavour-forge-server.vercel.app/all-recipes/"
                    ),
                hydrateFallbackElement: <Loading></Loading>,
                element: <AllRecipes />,
            },
            {
                path: "/add-recipe",
                element: (
                    <PrivateRoute>
                        <AddRecipe />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-recipes",
                element: (
                    <PrivateRoute>
                        <MyRecipes />
                    </PrivateRoute>
                ),
            },
            {
                path: "/wish-list",
                element: (
                    <PrivateRoute>
                        <WishList />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/recipes/:id",
        element: (
            <PrivateRoute>
                <RecipeDetails />
            </PrivateRoute>
        ),
        loader: ({ params }) =>
            fetch(
                `https://flavour-forge-server.vercel.app/all-recipes/${params.id}`
            ),
        hydrateFallbackElement: <Loading></Loading>,
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
    {
        path: "*",
        element: <Error />,
    },
]);

export default router;

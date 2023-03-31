import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import MainPage from "./Pages/MainPage";
import ArticleCreatePage from "./Pages/ArticleCreatePage";
import ArticleListPage, {
  loader as articleListLoader,
} from "./Pages/ArticleListPage";
import ArticleDetailPage, {
  loader as articleDetailLoader,
} from "./Pages/ArticleDetailPage";
import RecipeDetailPage from "./Pages/RecipeDetailPage";
import SymptomsRecommandPage from "./Pages/SymptomsRecommandPage";
import SurveyRecommendPage from "./Pages/SurveyRecommendPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import MyPage, { loader as myPageLoader } from "./Pages/MyPage";

import SearchRecommendPage from "./Pages/SearchRecommendPage";
import SurveyPage from "./Pages/SurveyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: "symptoms",
        element: <SymptomsRecommandPage />,
      },
      {
        path: "board",
        element: <ArticleListPage />,
        loader: articleListLoader,
      },
      {
        path: "board/:articleId",
        element: <ArticleDetailPage />,
        loader: articleDetailLoader,
      },
      {
        path: "newpost",
        element: <ArticleCreatePage />,
      },
      {
        path: "recipe/:recipeId",
        element: <RecipeDetailPage />,
      },
      {
        path: "my-survey",
        element: <SurveyRecommendPage />,
      },
      {
        path: "mypage",
        element: <MyPage />,
        loader: myPageLoader,
      },
      {
        path: "search",
        element: <SearchRecommendPage />,
      },
      {
        path: "newsurvey",
        element: <SurveyPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

export default router;

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/auth";
import ArticleReducer from "../reducers/articles";

export const store = configureStore({
    reducer: {
      auth: AuthReducer,
      article: ArticleReducer,
    }
});

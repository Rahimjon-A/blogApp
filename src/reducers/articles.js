import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    articles: [],
    articleDetail: null,
    error: null,
};

export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        getAriclesStart: (state) => {
            state.isLoading = true;
        },
        getArticlesSuccess: (state, action) => {
            (state.isLoading = false), (state.articles = action.payload);
        },
        getArticlesFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        articleDetailStart: (state) => {
            state.isLoading = true;
        },
        articleDetailSuccess: (state, action) => {
            state.articleDetail = action.payload;
            state.isLoading = false;
        },
        articleDetailFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        postArticeStart: state => {
            state.isLoading = true
        },
        postArtileSuccess: state => {
            state.isLoading = false
        },
        postArticleFailue: state => {
            state.isLoading = false;
            state.error = "Error"

        } 
    },
});

export const {
    getAriclesStart,
    getArticlesSuccess,
    getArticlesFailure,
    articleDetailStart,
    articleDetailSuccess,
    articleDetailFailure,
    postArticeStart,
    postArtileSuccess,
    postArticleFailue,
} = articleSlice.actions;

export default articleSlice.reducer;

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ArticleDetail, Home, Login, Navbar, Register, CreateArticle } from "./components";
import AuthService from "./service/auth";
import ArticleService from "./service/articles";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./reducers/auth";
import { getItem } from "./helpers/persistance";
import { getAriclesStart, getArticlesSuccess } from "./reducers/articles";

const App = () => {
    const dispatch = useDispatch();
    const getUser = async () => {
        try {
            const response = await AuthService.getUser();
            dispatch(signUserSuccess(response.user));
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const token = getItem("token");
        if (token) {
            getUser();
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/article/:slug" element={<ArticleDetail />} />
                    <Route path="/create-article" element={<CreateArticle />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

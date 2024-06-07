import { useDispatch, useSelector } from "react-redux";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { getAriclesStart, getArticlesSuccess } from "../reducers/articles";
import ArticleService from "../service/articles";
import { useEffect } from "react";
import ArticleCart from "./ArticleCart";

const Home = () => {
    const { articles, isLoading } = useSelector((state) => state.article);
    const dispatch = useDispatch();

    const getArticles = async () => {
        dispatch(getAriclesStart());
        try {
            const response = await ArticleService.getAricles();
            dispatch(getArticlesSuccess(response.articles));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getArticles();
    }, []);

    return (
        <>
            {isLoading ? <Spinner /> : null}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {articles.map((item) => (
                    <ArticleCart key={item.id} item={item} getArticles={getArticles} />
                ))}
            </div>
        </>
    );
};

export default Home;

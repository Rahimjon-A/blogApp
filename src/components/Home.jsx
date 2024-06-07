import { useDispatch, useSelector } from "react-redux";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { getAriclesStart, getArticlesSuccess } from "../reducers/articles";
import ArticleService from "../service/articles";
import { useEffect } from "react";

const Home = () => {
    const { articles, isLoading } = useSelector((state) => state.article);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const getArticles = async () => {
        dispatch(getAriclesStart());

        try {
            const response = await ArticleService.getAricles();
            dispatch(getArticlesSuccess(response.articles));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        getArticles();
    },[])

    return (
        <>
            {isLoading ? <Spinner /> : null}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {articles.map((item) => (
                    <div key={item.id} className="col">
                        <div className="card h-full shadow-sm">
                            <svg
                                className="bd-placeholder-img card-img-top"
                                width="100%"
                                height="225"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Placeholder: Thumbnail"
                                preserveAspectRatio="xMidYMid slice"
                                focusable="false"
                            >
                                <title>Placeholder</title>
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="#55595c"
                                ></rect>
                            </svg>
                            <div className="card-body">
                                <p className="card-text mb-0 text-[1.125rem] font-bold">
                                    {item.title}
                                </p>
                                <p className="card-text">{item.description}</p>
                            </div>
                            <div className="d-flex card-footer justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button
                                        onClick={() =>
                                            navigate(`/article/${item.slug}`)
                                        }
                                        type="button"
                                        className="btn btn-sm btn-outline-success"
                                    >
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <small className="text-body-secondary font-bold capitalize text-[15px]">
                                    {item.author.username}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;

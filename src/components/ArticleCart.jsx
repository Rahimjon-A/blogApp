import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArticleService from "../service/articles";


const ArticleCart = ({item, getArticles}) => {

    const { loggedIn, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handelDelete = async (slug) => {
        try {
            await ArticleService.deleteArticle(slug);
            getArticles();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div  className="col">
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
                    <rect width="100%" height="100%" fill="#55595c"></rect>
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
                            onClick={() => navigate(`/article/${item.slug}`)}
                            type="button"
                            className="btn btn-sm btn-outline-success"
                        >
                            View
                        </button>

                        {loggedIn && user.username === item.author.username && (
                            <>
                                <button
                                    onClick={() =>
                                        navigate(`/edit/${item.slug}`)
                                    }
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handelDelete(item.slug)}
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                    <small className="text-body-secondary font-bold capitalize text-[15px]">
                        {item.author.username}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default ArticleCart;

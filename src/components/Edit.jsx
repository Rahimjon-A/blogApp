import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import {
    articleDetailFailure,
    articleDetailStart,
    articleDetailSuccess,
    postArticeStart,
    postArticleFailue,
    postArtileSuccess,
} from "../reducers/articles";
import { useDispatch } from "react-redux";
import ArticleService from "../service/articles";
import Form from "../ui/Form";

const Edit = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { slug } = useParams();

    useEffect(() => {
        const getArticleDetail = async () => {
            dispatch(articleDetailStart());
            try {
                const response = await ArticleService.getArticleDetail(slug);
                setTitle(response.article.title);
                setBody(response.article.body);
                setDescription(response.article.description);
                dispatch(articleDetailSuccess(response.article));
            } catch (error) {
                dispatch(articleDetailFailure());
            }
        };
        getArticleDetail();
    },[]);

    const formSubmit = async (e) => {
        e.preventDefault();
        const article = { title, description, body };
        dispatch(postArticeStart());
        try {
            await ArticleService.editArticle(slug, article);
            dispatch(postArtileSuccess());
            navigate("/");
        } catch (error) {
            dispatch(postArticleFailue());
        }
    };

    return (
        <div className="text-center">
            <h1 className=" text-[32px] font-semibold mb-3 ">Edit Article</h1>
            <div className="w-75 mx-auto">
                <Form
                    description={description}
                    setDescription={setDescription}
                    body={body}
                    setBody={setBody}
                    title={title}
                    setTitle={setTitle}
                    formSubmit={formSubmit}
                />
            </div>
        </div>
    );
};

export default Edit;

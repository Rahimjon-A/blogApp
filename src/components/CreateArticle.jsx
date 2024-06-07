import { useState } from "react";
import Form from "../ui/Form";
import ArticleService from "../service/articles";
import { useDispatch } from "react-redux";
import {
    postArticeStart,
    postArticleFailue,
    postArtileSuccess,
} from "../reducers/articles";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        const article = { title, description, body };
        dispatch(postArticeStart());
        try {
            await ArticleService.postArticle(article);
            dispatch(postArtileSuccess());
            navigate("/");
        } catch (error) {
            dispatch(postArticleFailue());
        }
    };

    
    return (
        <div className="text-center">
            <h1 className=" text-[32px] font-semibold mb-3 ">Create Article</h1>
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

export default CreateArticle;

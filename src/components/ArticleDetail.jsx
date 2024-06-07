import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleService from "../service/articles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
    articleDetailFailure,
    articleDetailStart,
    articleDetailSuccess,
} from "../reducers/articles";
import Spinner from "../ui/Spinner";

const ArticleDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { articleDetail, isLoading } = useSelector((state) => state.article);

    useEffect(() => {
        const getArticleDetail = async () => {
            dispatch(articleDetailStart());
            try {
                const response = await ArticleService.getArticleDetail(slug);
                dispatch(articleDetailSuccess(response.article));
            } catch (error) {
                dispatch(articleDetailFailure());
            }
        };
        getArticleDetail();
    }, [slug]);

    return isLoading ? (
        <Spinner />
    ) : (
        articleDetail !== null && (
            <div>
                <div className="py-3 rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 mb-3 fw-bold">
                            {" "}
                            {articleDetail.title}{" "}
                        </h1>
                        <p className="col-md-8 fs-4 mb-4 font-medium ">
                            {articleDetail.description}
                        </p>
                        <div>
                            <div className="feature col border p-3 rounded-md w-[50%] mb-4 ">
                                <div className="feature-icon p-1 rounded-sm d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                                    Author :
                                </div>
                                <h3 className="fs-2 text-body-emphasis capitalize mb-3 ">
                                    {articleDetail.author.username}
                                </h3>
                                <p>{articleDetail.author.bio}</p>
                            </div>
                        </div>
                        <span className="text-[20px] text-muted ">
                            {" "}
                            <span className="font-bold">Created at:</span>{" "}
                            {moment(articleDetail.createdAT).format(
                                "MMMM Do YYYY"
                            )}{" "}
                        </span>
                    </div>
                </div>
                <div className="px-3 text-[18px] ">{articleDetail.body}</div>
            </div>
        )
    );
};

export default ArticleDetail;

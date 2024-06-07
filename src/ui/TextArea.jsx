import React from "react";

const TextArea = ({lable, state, setState, height}) => {
    return (
        <div className="form-floating mb-4">
            <textarea
                className="form-control resize-none "
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{height: height}}
                value={state}
                onChange={(e) => setState(e.target.value)}
            ></textarea>
            <label htmlFor="floatingTextarea2">{lable} </label>
        </div>
    );
};

export default TextArea;

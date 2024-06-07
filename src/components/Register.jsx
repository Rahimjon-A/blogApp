import { FcWikipedia } from "react-icons/fc";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    signUserFailure,
    signUserStart,
    signUserSuccess,
} from "../reducers/auth";
import AuthService from "../service/auth";
import {ValidationError} from './'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const { isLoading, loggedIn } = useSelector((state) => state.auth);

    const handeSubmit = async (e) => {
        e.preventDefault();
        dispatch(signUserStart());
        const user = {
            username: userName,
            email: email,
            password: password,
        };
        try {
            const response = await AuthService.userRegister(user);
            dispatch(signUserSuccess(response.user));
            navigate("/")
        } catch (error) {
            dispatch(signUserFailure(error.response.data.errors));
        }
    };

    useEffect(()=>{
        if(loggedIn){
            navigate("/")
           }
    }, [loggedIn])

    return (
        <div>
            <main className="form-signin w-25 m-auto text-center  ">
                <form>
                    <FcWikipedia className=" w-[70px] h-[70px] mx-auto "></FcWikipedia>
                    <h1 className="h3 mb-3 fw-normal my-4 ">Please register</h1>
                    <ValidationError />
                    <Input
                        setState={setUserName}
                        state={userName}
                        lable={"UserName"}
                    />
                    <Input
                        setState={setEmail}
                        state={email}
                        lable={"Email Address"}
                    />
                    <Input
                        setState={setPassword}
                        type={"password"}
                        state={password}
                        lable={"Password"}
                    />
                    <button
                        className="btn btn-primary w-100 py-2 "
                        type="submit"
                        onClick={handeSubmit}
                    >
                        {isLoading ? "loading..." : "Register"}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Register;

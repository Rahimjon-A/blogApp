import { FcWikipedia } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../helpers/persistance";
import { logOutUser } from "../reducers/auth";

const Navbar = () => {
    const { loggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = () => {
        removeItem("token")
        dispatch(logOutUser())
        navigate("/login")
    }

    return (
        <div>
            <div className=" container px-3 d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom mt-2 ">
                <Link to={"/"} className="flex items-center gap-2">
                    <FcWikipedia className=" w-[50px] h-[50px]  "></FcWikipedia>
                    <span className="fs-4 font-medium ">Blog App</span>
                </Link>

                <nav className="d-inline-flex gap-4 mt-2 mt-md-0 ms-md-auto">
                    {loggedIn ? (
                      <div className="flex gap-3 items-center" >
                          <p className=" text-[32px] leading-3 font-semibold " > {user.username} </p>
                          <Link
                                to={"/create-article"}
                                className="text-[24px] font-semibold text-muted cursor-pointer"
                            >
                                Cerate Article
                            </Link>
                          <button onClick={handleLogout} className=" btn btn-outline-danger " > Logout </button>
                      </div>
                    ) : (
                        <>
                            <Link
                                to={"/login"}
                                className="me-3 py-2  text-[20px] link-body-emphasis text-decoration-none"
                            >
                                Login
                            </Link>
                            <Link
                                to={"/register"}
                                className="me-3 text-[20px] py-2 link-body-emphasis text-decoration-none"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Navbar;

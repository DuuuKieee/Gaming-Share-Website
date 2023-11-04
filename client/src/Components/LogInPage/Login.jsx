import React, {useState} from "react";
import "./Login.scss";
import ReactDOM from 'react-dom';

const LogIn =({userLogIn, setUserLogIn}) => {
    const handleLogin = () => {
        // Xử lý đăng nhập ở đây
        // Sau khi đăng nhập thành công, gọi setUserLogIn(true) để cập nhật trạng thái đăng nhập
        setUserLogIn(true);
      };

    const [forgotPass, setforgotPass] = useState(false);
    const handleForgot = () => {
        setforgotPass((prevForgotPass) => !prevForgotPass);
      };
    return (
        <div className="LogInContainer">
            <div className="loginContent ">
                <form action="" className="LoginForm grid">
                    {forgotPass ? (
                        <>
                        <h1 className="Title">
                            Forgot Your Password?
                        </h1>
                        <h2 className="SubTitle">Please fill in the email that you used to register. You will be sent an email with instructions on how to reset your password.</h2>
                        <div className="inputBox">
                            <input type ="text" placeholder="Username" required />
                        </div>
                        <div className="inputBox">
                            <input type="email" placeholder="Email" required />
                        </div>
                        <button /*</form>type="submit"*/ className="SubmitButton">
                            <a href="/"></a>
                            Send Code
                        </button>
                        <button onClick={handleForgot} className="btn">Back to Login</button>
                    </>
                    ) : (
                        <>
                        <h1 className="Title">
                            Log In
                        </h1>
                        <div className="inputBox">
                            <input type ="text" placeholder="Username" required />
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="Password" required/>
                        </div>
                        
                        <div className="rememberForgot flex">
                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>
                            <button onClick={handleForgot}>Forgot your password?</button>
                        </div>
                        <button /*</form>type="submit"*/ className="SubmitButton">
                            Log In 
                        </button>
                    </>
                    )
                    }
                    

                    <div className="RegisterLink">
                        <p>Don't have an account?<a href="/Register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn
import React from "react";
import "./Register.scss";

const Register =({userLogIn, setUserLogIn}) => {
    
    return (
        <div className="RegisterContainer">
            <div className="registerContent ">
                <form action="" className="RegisterForm grid">
                    <h1 className="Title">
                        Create Your Account
                    </h1>
                    <div className="inputBox">
                        <input type ="text" placeholder="Username" required />
                    </div>
                    <div className="inputBox">
                        <input type="password" placeholder="Password" required />
                    </div>
                    
                    <div className="inputBox">
                        <input type ="email" placeholder="Email" required />
                    </div>
                    <button /*</form>type="submit"*/ className="SubmitButton">
                        <a href="/login"></a>
                        Create Account 
                    </button>

                    <div className="logInLink">
                        <p>Already have an account?<a href="/log-in">Log In</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
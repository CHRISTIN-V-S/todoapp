
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const nav = useNavigate();


    async function handleLogin(e) {
        e.preventDefault();

        try {

            const res = await axios.post(
                "https://todoapp-v7pm.vercel.app/api/user/login",
                {
                    email: userEmail,
                    password: userPassword
                }
            );

            console.log(res.data);

     
            localStorage.setItem("token", res.data.token);


            localStorage.setItem("userId", res.data.user.id);

            alert("Login Successful");

            setUserEmail("");
            setUserPassword("");

           
            nav("/");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message || "Login failed"
            );

        }
    }

    return (
        <div>

            <h2>User Login</h2>

            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Enter your email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
                <br /><br />
                <input type="password" placeholder="Enter your password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required/>
                <br /><br />
                <button type="submit">Login</button>
                <br /><br />
                <p>Don't have an account?<Link to="/register"> Register</Link></p>
            </form>

        </div>
    );
}

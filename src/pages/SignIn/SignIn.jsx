import Lottie from "lottie-react";
import signInLottie from '../../assets/lottie/sign-in-lottie.json'
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log('in sign-in page', location); //pathname: '/sign-in'
    //  state: '/jobs/675a06e62ab05c80ab8d102b'
    const from = location.state || '/';




    const { signInUser } = useContext(AuthContext);
    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInUser(email, password)
            .then(result => {
                console.log(result.user.email);
                const user = { email: email }
                axios.post('http://localhost:5000/jwt', user, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
                // navigate(from)
            })
            .catch(error => {
                console.log(`error is ${error.message}`);
            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold ml-8 mt-4">Sign In now!</h1>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                    </form>
                </div>
                <div className="text-center lg:text-left w-96">

                    <Lottie height={20} animationData={signInLottie}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
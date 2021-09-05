import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/GlobalState";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../assets/css/login.css";
import logo from '../assets/images/logo.png';
import appStore from '../assets/images/app-store.png';
import googlePlay from '../assets/images/google-play.png';

export default function Signup({ history }) {
  const { signup, loginWithGoogle, authError } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    setIsLoading(true);
    signup(
      email,
      username,
      fullName,
      password,
      () => history.push("/home"),
      () => setIsLoading(false)
    );
  };

  const handleGoogleLogin = () => {
    loginWithGoogle(() => history.push("/set-profile"));
  };

  return (
    <div id="wrapper">
      <div className="container">
        <div className="phone-app-demo"></div>
        <div className="form-data">
          <form onSubmit={handleSignup}>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <h2 class="vvzhL ">Sign up to see photos and videos from your friends.</h2>
            <button className="form-btn">
              <a className="google-login" onClick={handleGoogleLogin}>
                <i className="fab fa-google"></i> Log in with Google
              </a>
            </button>
            <span className="has-separator">Or</span>
            <input
              type="email"
              id="Email"
              name="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              id="FullName"
              name="FullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="text"
              id="Username"
              name="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              name="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="form-btn" disabled={isLoading}>
              {!isLoading ? (
                "Sign up"
              ) : (
                <CircularProgress size={20} color="inherit" />
              )}
            </button>
            <div className="auth__error">
              <small>{authError}</small>
            </div>
            <p className="policies">
              By signing up, you agree to our Terms , Data Policy and Cookies
              Policy .
            </p>
          </form>

          <div className="sign-up">
            <p>
              Have an account <Link to="/">Log in</Link>
            </p>
          </div>
          <div className="get-the-app">
            <span>Get the app.</span>
            <div className="badges">
              <img src={appStore} alt="app-store badge" />
              <img src={googlePlay} alt="google-play badge" />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="copyright-notice">
            © 2021 Instagram from Ajay
          </div>
        </div>
      </footer>
    </div>
  );
}

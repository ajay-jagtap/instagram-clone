import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/GlobalState";
import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingInstagram from "./LoadingInstagram";
import "../assets/css/login.css";
import logo from '../assets/images/logo.png';
import appStore from '../assets/images/app-store.png';
import googlePlay from '../assets/images/google-play.png';

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // To get the data from the Context
  const {
    login,
    loginWithGoogle,
    isPageLoading,
    setIsPageLoading,
    authError,
    OAuthError,
  } = useContext(Context);

  useEffect(() => {
    setIsPageLoading(true);
  }, [setIsPageLoading]);

  const handlelogin = (e) => {
    e.preventDefault();

    setIsLoading(true);

    login(
      email,
      password,
      () => history.push("/home"),
      () => setIsLoading(false)
    );
  };

  const handleGoogleLogin = () => {
    loginWithGoogle(() => history.push("/set-profile"));
  };

  // To show a loading page when page loads on re-authentication
  if (isPageLoading) {
    return <LoadingInstagram />;
  }

  return (
    <div id="wrapper">
      <div className="container">
        <div className="phone-app-demo"></div>
        <div className="form-data">
          <form onSubmit={handlelogin}>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
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
                "Log In"
              ) : (
                <CircularProgress size={20} color="inherit" />
              )}
            </button>
            {authError && (
              <div className="auth__error">
                <small>{authError}</small>
              </div>
            )}
            {OAuthError && (
              <div className="auth__error">
                <small>{OAuthError}</small>
              </div>
            )}
            <span className="has-separator">Or</span>
            <button className="form-btn">
              <a className="google-login" onClick={handleGoogleLogin}>
                <i className="fab fa-google"></i> Log in with Google
              </a>
            </button>
            <a className="password-reset" href="#">Forgot password?</a>
          </form>

          <div className="sign-up">
            Don't have an account? <Link to="/signup">Sign up</Link>
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

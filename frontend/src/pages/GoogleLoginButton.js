import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/social/google/", {
        access_token: credential,
      });
      console.log(res.data);
      // Save JWT token if needed:
      // localStorage.setItem("token", res.data.access);
      alert("Google login successful!");
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="http://674057373036-ha3ir668tf47l6ch8475q1fkgpu1k7dj.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
}

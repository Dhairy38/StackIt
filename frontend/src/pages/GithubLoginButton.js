export default function GithubLoginButton() {
  const handleGithubLogin = () => {
    // Redirect to Django's GitHub login URL
    window.location.href = "http://127.0.0.1:8000/accounts/github/login/";
  };

  return (
    <button onClick={handleGithubLogin} style={{ background: "#333", color: "#fff", padding: "10px" }}>
      Login with GitHub
    </button>
  );
}

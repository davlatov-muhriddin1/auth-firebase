import { FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useAuthStore } from "../store/auth.store";

function Auth() {
  const [auth, setAuth] = useState<"signup" | "signin">("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);

  const { signUp, signIn } = useAuth();
  const { isLoading, error } = useAuthStore();

  const toggleAuth = (state: "signin" | "signup") => {
    setAuth(state);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.length || !email.length) {
      setInvalid(true);
    }
    setInvalid(false);

    if (auth === "signup") {
      signUp(email, password);
    } else {
      signIn(email, password);
    }
  };

  return (
    <main className="container">
      <form className="mx-auto w-50 py-5" onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal text-center">
          Please {auth === "signup" ? "Sign up" : "Sign in"}
        </h1>
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <div className="form-floating">
          <input
            type="email"
            className={`form-control ${invalid && "is-invalid"}`}
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating my-3">
          <input
            type="password"
            className={`form-control ${invalid && "is-invalid"}`}
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : auth == "signin" ? "Sign in" : "Sign up"}
        </button>

        <p className="mt-2 fw-bold">
          {auth == "signup" ? "Already have account:" : " Not account yet:"}
          {auth == "signin" ? (
            <span
              className="text-primary cursor-pointer"
              onClick={() => toggleAuth("signup")}
              style={{ cursor: "pointer" }}
            >
              Sign up now
            </span>
          ) : (
            <span
              className="text-primary cursor-pointer"
              onClick={() => toggleAuth("signin")}
              style={{ cursor: "pointer" }}
            >
              Sign in now
            </span>
          )}
        </p>
      </form>
    </main>
  );
}

export default Auth;

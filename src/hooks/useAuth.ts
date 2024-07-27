import { createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { useAuthStore } from "../store/auth.store";

function useAuth() {
  const { user, setUser, isLoading, setLoading, error, setError } =
    useAuthStore();

  const navigate = useNavigate();

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);

        navigate("/");
      })
      .catch((err) => {
        const result = err as Error;
        setError(result.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);

        navigate("/");
      })
      .catch((err) => {
        const result = err as Error;
        setError(result.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOut = () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser({} as User);
        navigate("/auth");
      })
      .catch((err) => {
        const result = err as Error;
        setError(result.message);
      })
      .finally(() => setLoading(false));
  };

  return { signIn, signUp, logOut, isLoading, error };
}

export default useAuth;

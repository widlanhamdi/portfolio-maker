/* eslint-disable react-hooks/exhaustive-deps */
import Swal from "sweetalert2";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useSignUp = (email, password, name) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [payload, mutate] = useState(false);

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          email,
          role: "user",
        }).then(() => {
          mutate(false);
          setIsLoading(false);
          navigate("/login");
          Swal.fire({
            text: "Success!",
            title: "Register Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      })
      .catch((err) => {
        mutate(false);
        setIsLoading(false);
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return Swal.fire("Something Error!", "Email already in use", "error");
        }
        Swal.fire("Something Error!", "Please try again later", "error");
      });
  };

  useEffect(() => {
    if (payload) {
      setIsLoading(true);
      signUp();
    }
  }, [payload, email, password, name]);

  return { mutate, isLoading };
};

export default useSignUp;

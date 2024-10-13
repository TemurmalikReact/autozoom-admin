import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { apiRequest } from "../../utils/api";
import { useTokenStore } from "../../zustand/TokenStore";

import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !password) {
      setError("Please fill all the fields");
      return;
    }
    setLoading(true);

    try {
      const response = await apiRequest("auth/signin", "Post", {
        phone_number: phoneNumber,
        password: password,
      });

      if (response?.success) {
        toast.success('Successfully signed in');

        setTimeout(() => {
          setToken(response?.data?.tokens?.accessToken?.token);
          navigate("/");
        }, 1000);

      } else {
        setError(response.message || "Login failed");
      }
    } catch (localError) {
      const errorObject = JSON.parse(localError.message);
      const errorMessage = errorObject.message || "Unknown error occurred";

      toast.error(errorMessage);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.login__container}>
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.login__input_box}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xmlSpace="preserve"><path d="M16 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM27 32a1 1 0 0 1-1-1v-6.115a6.95 6.95 0 0 0-6.942-6.943h-6.116A6.95 6.95 0 0 0 6 24.885V31a1 1 0 1 1-2 0v-6.115c0-4.93 4.012-8.943 8.942-8.943h6.116c4.93 0 8.942 4.012 8.942 8.943V31a1 1 0 0 1-1 1z" /></svg>
            <input
              type="text"
              placeholder="Phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className={styles.login__input_box}>
            <svg stroke="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <span className={styles.login__error_message}>{error}</span>}
          <button className={styles.login__submit_button}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
        {loading && (
          <div className={styles.login__loading_overlay}>
            <Flex align="center" gap="middle" className={styles.login__spinner_container}>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </Flex>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;

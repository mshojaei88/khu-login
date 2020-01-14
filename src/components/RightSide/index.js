import React, { useState, useEffect } from "react";
import Input from "./Input";
import LoginButton from "./LoginButton";
import FormHeader from "./FormHeader";
import LinkToManagePassword from "./LinkToManagePassword";
import axios from "axios";

const RightSide = () => {
  const [username, setUserName] = useState("");
  const [password, setPssword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [captcha_key, setCaptchaKey] = useState("");
  const [successLogin, setSuccessLogin] = useState(false);
  const [section_one, setSectionOne] = useState("");
  const [section_two, setSectionTwo] = useState("");

  useEffect(() => {
    if (successLogin) {
      setPssword("");
      setCaptcha("");
      setCaptchaImage("");
      setCaptchaKey("");
    } else {
      axios
        .get("http://localhost:3000")
        .then(response => {
          setCaptchaImage(`data:image/png;base64, ${response.data.captcha}`);
          setCaptchaKey(response.data.captcha_key);
        })
        .catch(error => {
          alert("مشکلی پیش آمده لطفا صفحه را بروزرسانی کنید");
        });
    }
  }, [successLogin]);

  function sumbitLogin(e) {
    e.preventDefault();
    if (!successLogin) {
      axios
        .post("http://localhost:3000/login", {
          username,
          password,
          captcha_key,
          captcha,
          mode: 191
        })
        .then(response => {
          setSuccessLogin(true);
        })
        .catch(error => {
          alert("error");
        });
    } else {
      axios
        .post("http://localhost:3000/logout", {
          username,
          mode: 193
        })
        .then(response => {
          setUserName("");
          setSuccessLogin(false);
        })
        .catch(error => {
          alert("error");
        });
    }
  }

  return (
    <form onSubmit={sumbitLogin} className="login-form validate-form">
      <FormHeader />
      {successLogin && (
        <div className="success-login-message">با موفقیت وارد شدید</div>
      )}
      <Input
        onChange={e => {
          setUserName(e.target.value);
        }}
        value={username}
        type="number"
        name="id"
        label="شماره دانشجویی"
      />
      <Input
        onChange={e => {
          setPssword(e.target.value);
        }}
        value={password}
        type="password"
        name="password"
        label="رمز عبور"
      />
      <div className="captcha-wrapper">
        <img className="captcha" src={captchaImage} />
      </div>
      <Input
        onChange={e => {
          setCaptcha(e.target.value);
        }}
        value={captcha}
        autoComplete="off"
        type="number"
        name="captcha"
        label="لطفا ارقام تصویر بالا را وارد نمایید"
      />
      <LoginButton successLogin={successLogin} />
      <LinkToManagePassword />
    </form>
  );
};

export default RightSide;

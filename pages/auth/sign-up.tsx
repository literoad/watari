import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import BigButton from "../../components/big-button";
import s from "../../styles/pages/SignUp.module.css";
import { signIn } from "next-auth/react";

const SignUp: NextPage = () => {
  const [email, setEmail] = useState("");
  const [canContinue, setCanContinue] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current?.checkValidity) {
      setCanContinue(emailInputRef.current.checkValidity());
    } else {
      setCanContinue(email.includes("@"));
    }
  }, [email]);

  return (
    <div>
      <Head>
        <title>Вход в панель управления | Literoad</title>
      </Head>
      <section className={`lr-container ${s.form}`}>
        <h2>Вход в панель управления</h2>
        <p>
          Для получения доступа нужен только адрес электронной почты. Вы
          получите письмо со ссылкой для автоматического входа.
        </p>
        <input
          value={email}
          ref={emailInputRef}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="name@example.org"
          required
        />
        <BigButton
          onClick={() => signIn("email", { email, callbackUrl: "/dashboard" })}
          disabled={!canContinue}
        >
          Войти
        </BigButton>
      </section>
    </div>
  );
};

export default SignUp;

import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [wordInput, setWordInput] = useState("");
  const [resultImage, setResultImage] = useState();
  const [resultText, setResultText] = useState();
  const [resultTextTwitter, setResultTextTwitter] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: wordInput }),
    });
    const data = await response.json();
    setResultImage(data.resultImage);
    setResultText(data.resultText);
    setWordInput("");
  }

  return (
    <div>
      <Head>
        <title>Rediskets</title>
        <link rel="icon" href="/logo-small.png" />
      </Head>

      <main className={styles.main}>
        <img src="/logo.png" className={styles.icon} />
        <h3>Create my content</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="word"
            placeholder="Enter key words"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
          />
          <input type="submit" value="Generate content" />
        </form>
        <div className={styles.result}>
          <img className={styles.resultImage} src={resultImage} />
          {resultText}
        </div>
      </main>
    </div>
  );
}

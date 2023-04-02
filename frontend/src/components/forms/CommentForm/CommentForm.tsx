import React, { ChangeEventHandler, FormEventHandler } from "react";
import styles from "./CommentForm.module.css";
import { Playfair_Display, Source_Sans_Pro, Rubik } from "next/font/google";

const rubik = Rubik({ weight: "500", subsets: ["latin"] });

interface ICommentForm {
  data: {
    name: string;
    email: string;
    comment: string;
  };
  error?: string;
  isLoading: boolean;
  onChange: ChangeEventHandler;
  onSubmit: FormEventHandler;
}

export default function CommentForm({
  data: { name, comment, email },
  error,
  isLoading,
  onChange,
  onSubmit,
}: ICommentForm) {
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <input
        placeholder="Name"
        type="text"
        value={name}
        name="name"
        className={styles.input}
        id="name"
        required
        onChange={onChange}
      />
      <input
        placeholder="Email"
        className={styles.input}
        type="email"
        name="email"
        required
        value={email}
        id="email"
        onChange={onChange}
      />
      <textarea
        className={styles.input}
        name="comment"
        id="comment"
        required
        placeholder="Comment"
        rows={10}
        value={comment}
        onChange={onChange}
      />
      {error && <div className={styles.error}>{error}</div>}
      <button
        disabled={isLoading}
        className={`${rubik.className} ${styles.submit}`}
        type="submit"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

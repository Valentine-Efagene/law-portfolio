"use client";

import React, {
  ChangeEventHandler,
  ChangeEvent,
  FormEventHandler,
  useState,
} from "react";
import styles from "./CommentForm.module.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({ weight: "500", subsets: ["latin"] });

interface ICommentForm {
  _id: string;
}

export default function CommentForm({ _id }: ICommentForm) {
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const defaultData = {
    post_id: _id,
    name: "",
    email: "",
    comment: "",
  };

  const [data, setData] = useState<{
    post_id: string;
    name: string;
    email: string;
    comment: string;
  }>(defaultData);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      setIsSubmittingComment(true);
      const response = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const {
        message,
        error: _err,
      }: {
        message: string;
        error: {
          statusCode: number;
        };
      } = await response.json();

      setError(_err ? message : undefined);

      setData((prevState) => (_err ? prevState : defaultData));
      setSubmitted(_err ? false : true);
    } catch (error) {
      const err = error as { message: string };
      setError(err.message);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleChange: ChangeEventHandler = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { name, email, comment } = data;

  return (
    <div className={styles.container}>
      {submitted ? (
        <div className={styles.commentFeedback}>
          <h2>Comment Submitted</h2>
          <p>
            Your comment is being reviewed, and will be displayed once approved
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            placeholder="Name"
            type="text"
            value={name}
            name="name"
            className={styles.input}
            id="name"
            required
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            className={styles.input}
            type="email"
            name="email"
            required
            value={email}
            id="email"
            onChange={handleChange}
          />
          <textarea
            className={styles.input}
            name="comment"
            id="comment"
            required
            placeholder="Comment"
            rows={10}
            value={comment}
            onChange={handleChange}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button
            disabled={isSubmittingComment}
            className={`${rubik.className} ${styles.submit}`}
            type="submit"
          >
            {isSubmittingComment ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}

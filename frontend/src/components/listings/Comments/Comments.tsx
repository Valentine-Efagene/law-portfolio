import { IComment } from "@/helpers/types";
import React from "react";
import styles from "./Comments.module.css";

interface ICommentsProp {
  comments?: IComment[];
  className?: string;
}

function Comments({ comments, className }: ICommentsProp) {
  return (
    <div className={`${className} ${styles.container}`}>
      {comments &&
        comments.map((comment) => {
          const { _id, name, comment: text } = comment;
          return (
            <div key={_id} className={styles.comment}>
              <p>
                <strong>{name}</strong>: {text}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default Comments;

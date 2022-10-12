import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useNavigate, Nagivate } from "react-router-dom";

export const Index = ({ postId, imageUrl }) => {
  const navigate = useNavigate();
  const [comment, setComment] = React.useState("");

  const onSubmit = async () => {
    try {
      const fields = {
        comment,
      };
      await axios
        .post(`/comments/${postId}`, fields)
      window.location.reload();
    } catch (error) {
      console.warn(error);
      alert("Error while sending comment");
    }
  };
  return (
    <>
      <div className={styles.root}>
      <Avatar
          classes={{ root: styles.avatar }}
          src={imageUrl ? imageUrl : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pphfoundation.ca%2Fabout%2Fdefault-avatar%2F&psig=AOvVaw2D9Tt1nZmfGoEt0yFPBoPq&ust=1665638471227000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjtko_42foCFQAAAAAdAAAAABAS'}
        />
        <div className={styles.form}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Add a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

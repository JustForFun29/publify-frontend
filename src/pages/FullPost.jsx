import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { fetchCommentsForPost } from "../redux/slices/comments";
import { selectIsAuth, fetchAuthMe } from "../redux/slices/auth";

export const FullPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  // const [comments, setComments] = React.useState();
  // const [commentsLoading, setCommentsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  const isCommentsLoading = comments.status === "loading";

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error while getting the post");
      });

    dispatch(fetchCommentsForPost(id))
    dispatch(fetchAuthMe()).then(console.log("dispatch authme:", isAuth))
    // axios
    //   .get(`/comments/${id}`)
    //   .then((res) => {
    //     setComments(res.data);
    //     console.log("axios results:", comments);
    //     setCommentsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.warn(err);
    //     alert("Error while getting the comments");
    //   });
  }, []);


  if (isLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text} />
        </p>
      </Post>
      <CommentsBlock items={comments.comments.items} isLoading={isCommentsLoading}>
        {isAuth && <Index postId={id} imageUrl={isAuth.imageUrl}/>}
      </CommentsBlock>
    </>
  );
};

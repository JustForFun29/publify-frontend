import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  fetchPostsPopular,
  fetchPosts,
  fetchTags,
} from "../redux/slices/posts";
import { fetchCommentsLatest } from "../redux/slices/comments";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  React.useEffect(() => {
    if (tabIndex === 0) {
      dispatch(fetchPosts());
      dispatch(fetchTags());
      dispatch(fetchCommentsLatest());
    } else {
      dispatch(fetchPostsPopular());
      dispatch(fetchTags());
      dispatch(fetchCommentsLatest());
    }
  }, [tabIndex]);

  console.log(comments.comments.items, isCommentsLoading);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments.comments.items}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};

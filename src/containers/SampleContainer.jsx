import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";

const SampleContainer = (props) => {
  const { post, users, loadingPost, loadingUsers } = useSelector(
    ({ sample, loading }) => ({
      post: sample.post,
      users: sample.users,
      loadingPost: loading["sample/GET_POST"],
      loadingUsers: loading["sample/GET_USERS"],
    })
  );
  const dispatch = useDispatch();
  const onGetPost = useCallback((id) => dispatch(getPost(id)));
  const onGetUsers = useCallback((id) => dispatch(getUsers(id)));
  useEffect(() => {
    const fn = async () => {
      try {
        await onGetPost(1);
        await onGetUsers();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getPost, getUsers]);

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    ></Sample>
  );
};

export default React.memo(SampleContainer);

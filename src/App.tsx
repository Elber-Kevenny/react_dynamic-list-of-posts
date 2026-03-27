import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Users } from './types/User';
import { getPost, getUser } from './Api/Api';
import { Post } from './types/Post';

export const App = () => {
  const [users, setUser] = useState<Users[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [isShowUsers, setIsShowUsers] = useState<boolean>(false);
  const [post, setPost] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>();

  const handleShowSidebar = (open: boolean) => {
    setIsOpen(open);
  };

  const havePost =
    post.length === 0 ? false : post.every(p => p.userId === userId);

  useEffect(() => {
    // useeffect, mostra os usuarios solicitados a Api na hora que a pagina carrega, pois os [] estao vazios
    getUser()
      .then(userVindoDaApi => {
        setUser(userVindoDaApi);
      })
      .catch(error => error);
  }, []);

  useEffect(() => {
    setIsLoader(true);
    setErrorMessage('');
    if (!userId) {
      setPost([]);

      return;
    }

    getPost({ userId })
      .then(postVindoDaApi => {
        setPost(postVindoDaApi);
      })
      .catch(() => setErrorMessage('Something went wrong!'))

      .finally(() => {
        setIsLoader(false);
        handleShowSidebar(false);
      });
  }, [userId]);

  const handleShowUser = () => {
    setIsShowUsers(prev => !prev);
  };

  const handleUser = (id: number) => {
    setUserId(id);
  };

  const handlePostId = (id: number) => {
    setPostId(id);
  };

  const selecteUser = users.find(u => u.id === userId);

  const ttt = post.filter(p => p.userId === userId);

  return (
    <>
      <main className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <UserSelector
                    users={users}
                    onListUser={handleShowUser}
                    showUser={isShowUsers}
                    onUserId={handleUser}
                    userId={userId}
                    setIsShowUsers={setIsShowUsers}
                  />
                </div>

                <div className="block" data-cy="MainContent">
                  <p data-cy="NoSelectedUser">
                    {selecteUser ? '' : 'No user selected'}
                  </p>

                  {isLoader && userId > 0 && <Loader />}

                  {errorMessage.length !== 0 && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      {errorMessage}
                    </div>
                  )}
                  {
                    /* eslint-disable @typescript-eslint/indent */ !isLoader &&
                      post.length === 0 &&
                      !havePost &&
                      errorMessage.length === 0 && (
                        <div
                          className="notification is-warning"
                          data-cy="NoPostsYet"
                        >
                          No posts yet
                        </div>
                      )
                  }

                  {!isLoader && post.length > 0 && (
                    <PostsList
                      posts={post}
                      userId={userId}
                      showSideBar={handleShowSidebar}
                      onPostId={handlePostId}
                      postId={postId}
                    />
                  )}
                </div>
              </div>
            </div>

            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                { 'Sidebar--open': isOpen && ttt.length > 0 },
              )}
            >
              {isOpen && (
                <div className="tile is-child box is-success ">
                  <PostDetails posts={post} postId={postId} userId={userId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

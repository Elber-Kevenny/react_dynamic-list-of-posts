import React from 'react';
import { Posts } from '../types/Post';

export const PostsList: React.FC<Posts> = ({
  posts,
  userId,
  showSideBar,
  onPostId,
  postId,
}) => {
  const postSelected = posts.filter(p => p.userId === userId);

  const tableClass = 'table is-fullwidth is-striped is-hoverable is-narrow';

  return (
    <>
      {userId > 0 && postSelected.length > 0 && (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table className={tableClass}>
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <></>
              {postSelected.map(p => (
                <tr data-cy="Post" key={p.id}>
                  <td data-cy="PostId">{p.id}</td>

                  <td data-cy="PostTitle">{p.title}</td>

                  <td className="has-text-right is-vcentered">
                    {p.id === postId ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link"
                        onClick={() => {
                          showSideBar(false);
                          onPostId(0);
                        }}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => {
                          showSideBar(true);
                          onPostId(p.id);
                        }}
                      >
                        Open
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

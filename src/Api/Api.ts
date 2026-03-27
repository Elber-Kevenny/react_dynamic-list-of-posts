import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const USER_ID = 4072;

export const getUser = () => {
  return client.get<User>('/users/');
};

export const getPost = ({ userId }: Omit<Post, 'id' | 'title' | 'body'>) => {
  // aqui
  return client.get<Post[]>(`/posts?userId=${userId}`);
};
/*Crie uma função chamada getPost que recebe um objeto contendo apenas o userId. Quando executada,
ela vai ao servidor buscar uma lista de posts
filtrada por esse ID e me promete entregar esses dados formatados como um array de Posts. ou seja, essa função
vai ate o servidor buscar os post com o id que passei para ela, com base nessa id ela entrega o array de post ao .then */

export const getComment = ({ postId }: Omit<Comment, 'id'>) => {
  return client.get(`/comments?postId=${postId}`);
};

export const createComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post(`/comments`, { postId, name, email, body });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Coments {
  comment: Comment[];
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface ComentProps {
  setComments: Comment;
  postId: number;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;

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
  setComments: (value: React.Dispatch<React.SetStateAction<Comment[]>>) => void;
  postId: number;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}


export interface ComentProps {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  postId: number;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;

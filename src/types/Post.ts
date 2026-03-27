export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface GetPost {
  userId: number;
}

export interface Posts {
  posts: Post[];
  showSideBar: () => void;
  isShowClose: boolean;
  userId: number;
  onPostId: (id: number) => void;
  postId: number;
}

export type CreatePostCommand = {
  postId:string,
  author:string,
  title:string,
  photoUrl: string,
  participantId: string
}

export type AddCommentCommand = {
  commentId:string,
  postId:string,
  author:string,
  content:string
}
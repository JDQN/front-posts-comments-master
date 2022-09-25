export type CreatePostCommand = {
  postId: string,
  author: string,
  title: string,
  photoUrl: string,
  participantId: string
}

export type AddCommentCommand = {
  commentId: string,
  postId: string,
  author: string,
  content: string
}

export type DeletePostCommand = {
  postId: string
}

export type AddReactionCommand = {
  postId: string,
  reaction: string
}
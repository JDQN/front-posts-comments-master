export type CreatePostCommand = {
  postId: string,
  author: string,
  title: string,
  photoUrl: string,
  participantId: string
}

export type AddCommentCommand = {
  postId: string,
  commentId: string,
  author: string,
  content: string
  participantId: string
}

export type DeletePostCommand = {
  postId: string
}

export type AddReactionCommand = {
  postId: string,
  reaction: string
}
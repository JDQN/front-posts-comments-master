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

export type AddRelevantVoteCommand = {
  postId: string
}


export type SendMessageCommand ={
  messageId: string,
  participantId: string,
  name: string,
  content: string
}
export type AddFavoritePost = {
  participantId: string,
  postId: string
}

export type DeleteComment = {
  postId: string,
  commentId: string;
}
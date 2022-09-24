export type PostView = {
  aggregateId: string,
  author: string,
  title: string
  comments: CommentView[]
}

export type CommentView = {
  id: string,
  postId: string,
  author: string,
  content: string
}

export type ParticipantView = {
  id: string,
  aggregateId: string,
  name: string,
  photoUrl: string,
  rol: string,
  messages: [],
  events: EventView[],
  favoritesId: string[],
  favorites: PostView[]
}

export type EventView = {
  id: string,
  participantId: string,
  dateOfEvent: string,
  element: string,
  type: string,
  detail: string
}
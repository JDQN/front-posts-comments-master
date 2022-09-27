export type PostView = {
  aggregateId: string,
  author: string,
  title: string,
  photoUrl: string,
  relevanceVote: string,
  participantId: string,
  deleted: string,
  comments: CommentView[],
  reactions: string[]
}


export type CommentView = {
  id: string,
  postId: string,
  author: string,
  content: string
  participantId: string,
}

export type SocketMessage = {
  type: string,
  body: any
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

export type AdminView = {
  id: string,
  email: string
}

export type MessageView = {
  content:string,
  id:string,
  name:string,
  participantId:string
}

import { CreatePostCommand, AddCommentCommand, DeletePostCommand, AddReactionCommand, AddRelevantVoteCommand, AddFavoritePost, SendMessageCommand, DeleteComment } from './../../models/command.models';
import { PostView, ParticipantView } from './../../models/views.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EventToCast } from 'src/app/commands/event';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  /*EndPoint Heroku
  GET_ALL_POSTS_URL = 'https://beta-posts-comments.herokuapp.com/bring/all/posts'
  GET_POST_BY_ID_URL = 'https://beta-posts-comments.herokuapp.com/bring/post/'
  POST_POST_URL = 'https://alpha-posts-comments.herokuapp.com/create/post'
  POST_COMMENT_URL = 'https://alpha-posts-comments.herokuapp.com/add/comment' */


  //EndPoint Locales
  // GET_ALL_POSTS_URL = 'http://localhost:8081/bring/all/posts'
  // GET_POST_BY_ID_URL = 'http://localhost:8081/bring/post/'
  // POST_POST_URL = 'http://localhost:8080/create/post'
  // POST_COMMENT_URL = 'http://localhost:8080/add/comment'
  // AUTH_USER_POST = 'http://localhost:8080/'
  // CAST_EVENT_URL = "http://localhost:8080/cast/event"
  // GET_PARTICIPANT_BY_ID_URL = 'http://localhost:8081/bring/participant/'
  // ADD_REACTION_URL = 'http://localhost:8080/add/reaction'
  // ADD_RELEVANTVOTE_URL = 'http://localhost:8080/add/vote'
  // ADD_FAVORITE_URL = 'http://localhost:8080/add/favorite'
  // GET_ALL_PARTICIPANTS = 'http://localhost:8081/bring/all/participants'
  // POST_SEND_MESSASGE = 'http://localhost:8080/send/message'
  // DELETE_COMMENT_POST = 'http://localhost:8080/delete/comment'




  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  logIn(user: any) {
    return this.http.post<any>(environment.urlCommands + "auth/login", user, this.httpOptions)
  }

  addPost(post: CreatePostCommand, token: string): Observable<CreatePostCommand> {
    return this.http.post<CreatePostCommand>(
      environment.urlCommands + "create/post",
      post,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      })
  }

  deletePost(postId: string, token: string) {
    return this.http.post<any>(
           `${environment.urlCommands}delete/post/${postId}`, "",
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    )
  }

  getParticipantById(id: string | null) {
    return this.http.get<ParticipantView>(`${environment.urlQuerys}bring/participant/${id}`).pipe(
      catchError(this.handleError<ParticipantView>('getParticipant'))
    );
  }

  getPosts() {
    return this.http.get<PostView[]>(environment.urlQuerys + "bring/all/posts").pipe(
      catchError(this.handleError<PostView[]>('getPosts', []))
    );
  }

  getParticipants() {
    return this.http.get<ParticipantView[]>(environment.urlQuerys + "bring/all/participants").pipe(
      catchError(this.handleError<ParticipantView[]>('getParticipants', []))
    );
  }

  getPostsById(id: string | null) {
    return this.http.get<PostView>(`${environment.urlQuerys}bring/post/${id}`).pipe(
      catchError(this.handleError<PostView>('getPost'))
    );
  }

  createPost(command: CreatePostCommand, token: string) {
    return this.http.post<any>(environment.urlCommands + "create/post", command,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(this.handleError<any>('createPost'))
    );
  }

  createComment(command: AddCommentCommand, token: string) {
    return this.http.post<any>(environment.urlCommands + "add/comment", command,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(this.handleError<any>('createPost'))
    );
  }

  castEvent(command: EventToCast) {
    return this.http.post<any>(environment.urlCommands + "cast/event", command, this.httpOptions).pipe(
      catchError(this.handleError<any>('castEvent'))
    )
  }

  addReaction(reaction: AddReactionCommand, token: string) {
    return this.http.post<any>(environment.urlCommands + "add/reaction", reaction,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(
        this.handleError<any>('castEvent'))
    )
  }

  updateRelevantVote(postId: AddRelevantVoteCommand, token: string) {
    return this.http.post<any>(environment.urlCommands + "add/vote", postId,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(this.handleError<any>('castEvent'))
    )
  }


  sendMessageToParticipant(message: SendMessageCommand, token: string) {
    return this.http.post<any>(environment.urlCommands + "send/message", message,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(this.handleError<any>('castEvent'))
    )
  }

  addFavoritePost(command: AddFavoritePost, token: string) {
    return this.http.post<any>(environment.urlCommands + "add/favorite", command,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(this.handleError<any>('castEvent'))
    )
  }

  deleteComment(command: DeleteComment, token: string) {
    return this.http.post<any>(environment.urlCommands + "delete/comment", command,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }
    ).pipe(
      catchError(this.handleError<any>('castEvent'))
    )
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

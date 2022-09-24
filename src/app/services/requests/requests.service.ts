import { CreatePostCommand, AddCommentCommand } from './../../models/command.models';
import { PostView } from './../../models/views.models';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
  GET_ALL_POSTS_URL = 'http://localhost:8081/bring/all/posts'
  GET_POST_BY_ID_URL = 'http://localhost:8081/bring/post/'
  POST_POST_URL = 'http://localhost:8080/create/post'
  POST_COMMENT_URL = 'http://localhost:8080/add/comment'
  AUTH_USER_POST = 'http://localhost:8080/'


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http:HttpClient) { }

  logIn(user: any) {
    return this.http.post<any>(this.AUTH_USER_POST + "auth/login", user, this.httpOptions)
  }

  addPost(post: CreatePostCommand, token: string): Observable<CreatePostCommand> {
    return this.http.post<CreatePostCommand>(
      this.POST_POST_URL,
      post,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      })
  }


  getPosts(){
    return this.http.get<PostView[]>(this.GET_ALL_POSTS_URL).pipe(
      catchError(this.handleError<PostView[]>('getPosts', []))
    );
  }

  getPostsById(id:string|null){
    return this.http.get<PostView>(`${this.GET_POST_BY_ID_URL}${id}`).pipe(
      catchError(this.handleError<PostView>('getPochsts'))
    );
  }

  createPost(command:CreatePostCommand){
    return this.http.post<any>(this.POST_POST_URL, command, this.httpOptions).pipe(
      catchError(this.handleError<any>('createPost'))
    );
  }

  createComment(command:AddCommentCommand){
    return this.http.post<any>(this.POST_COMMENT_URL, command, this.httpOptions).pipe(
      catchError(this.handleError<any>('createPost'))
    );
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

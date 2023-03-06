import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Move } from '../model/move';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:9000';
  }

  public messageAdded: EventEmitter<void> = new EventEmitter<void>();

  public findAll(): Observable<Move[]> {
    return this.http.get<Move[]>(this.usersUrl + '/moves');
  }

  public save(user: Move) {
    return this.http.post<Move>(this.usersUrl + '/saveMove', user);
  }
}

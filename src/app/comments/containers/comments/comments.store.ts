import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CommentsStore {
  private addReplyExpendedState$ = new BehaviorSubject<{ [key: string]: boolean }>({});

  public addReplyStateAsObservable(): Observable<{ [key: string]: boolean }> {
    return this.addReplyExpendedState$.asObservable();

  }

  public expandReplyTextBox(commentId: string) {
    const newState = this.addReplyExpendedState$.value;
    newState[commentId] = true;
    this.addReplyExpendedState$.next(newState);
  }

  public collapseReplyTextBox(commentId: string) {
    const newState = this.addReplyExpendedState$.value;
    newState[commentId] = false;
    this.addReplyExpendedState$.next(newState);
  }
}

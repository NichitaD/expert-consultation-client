import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from '@app/core/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CommentsService } from '../../services';
import {
  AddReply,
  AddReplySuccess,
  AddReplyFail,
  RepliesActionTypes
} from '../actions/replies.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RepliesEffect {

  @Effect()
  saveReply$ = this.actions$.pipe(
      ofType(RepliesActionTypes.AddReply),
      switchMap(
          (action: AddReply) => this.commentsService.saveReply(action.nodeId, action.commentId, action.text)
              .pipe(map(comment => new AddReplySuccess(action.nodeId, action.commentId, comment)))),
      catchError((error: any) => of(new AddReplyFail(error.nodeId, error.commentId, error.response)))
  );


  constructor(private store$: Store<CoreState>,
              private actions$: Actions,
              private commentsService: CommentsService) {
  }
}

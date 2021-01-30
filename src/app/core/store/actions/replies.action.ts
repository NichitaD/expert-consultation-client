import { Action } from '@ngrx/store';
import { Comment, Page } from '../../models';

export enum RepliesActionTypes {
  AddReply = '[Replies] Add Reply',
  AddReplySuccess = '[Replies] Add Reply Success',
  AddReplyFail = '[Replies] Add Reply Fail',
}

export class AddReply implements Action {
  readonly type = RepliesActionTypes.AddReply;

  constructor(public nodeId: string, public commentId: string, public text: string) {
  }
}

export class AddReplySuccess implements Action {
  readonly type = RepliesActionTypes.AddReplySuccess;

  constructor(public nodeId: string, public commentId: string, public comment: Comment) {
  }
}

export class AddReplyFail implements Action {
  readonly type = RepliesActionTypes.AddReplyFail;

  constructor(public nodeId: string, public commentId: string, public error: any) {
  }
}

export type RepliesAction =
    | AddReply
    | AddReplySuccess
    | AddReplyFail;

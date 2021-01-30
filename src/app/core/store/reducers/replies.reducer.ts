import {  IPageData } from '../../models';
import { RepliesAction, RepliesActionTypes } from '../actions/replies.action';
import {  CommentsState } from './comments.reducer';

const initialState: CommentsState = {
  entities: {},
  pending: [],
  loading: false,
  pageData: {pageable: {}} as IPageData,
};

export function reducer(state = initialState, action: RepliesAction): CommentsState {
  switch (action.type) {
    case RepliesActionTypes.AddReplySuccess: {
      const currentNodeState = state[action.commentId];
      if (!!currentNodeState) {
        const updatedNodeState = {
          ...currentNodeState,
          entities: [...currentNodeState.entities, action.comment.toJson()],
        };
        return {
          ...state,
          [action.commentId]: updatedNodeState
        };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
}

import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddReply } from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Comment } from '@app/core';
import { CommentsStore } from '../comments/comments.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ec-replies',
  templateUrl: './replies.component.html',
})
export class RepliesComponent {
  @Input() public nodeId: string;
  @Input() public commentId: string;
  @Input() public replies: Array<Comment>;

  isAddReplyBoxExpanded$ = this.commentsStore.addReplyStateAsObservable().pipe(
    map(state => {
      return state[this.commentId];
    })
  );

  constructor(private store: Store<CoreState>, private commentsStore: CommentsStore) {}

  onReplyAdded(comment: string) {
    this.store.dispatch(new AddReply(this.nodeId, this.commentId, comment));
  }

  collapseAddReplyBox(): void {
    this.commentsStore.collapseReplyTextBox(this.commentId);
  }
}

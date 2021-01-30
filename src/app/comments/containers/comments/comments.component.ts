import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddComment, CoreState, getCommentsEntitiesByNodeId, UpdateCommentVote } from '@app/core/store';
import { CommentsStore } from '@app/comments/containers/comments/comments.store';
import { Observable } from 'rxjs';
import { Comment } from '@app/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { takeUntil } from 'rxjs/operators';
import { IVote, VoteType } from '@app/core/models/vote.model';

@Component({
  selector: 'ec-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentsStore],
})
export class CommentsComponent extends BaseComponent implements OnInit {
  @Input() public nodeId: string;
  @Input() public isInConsultation: boolean;
  @Output() public commentsCollapsed: EventEmitter<void> = new EventEmitter<void>();

  public comments$: Observable<Comment[]>;
  public VoteType = VoteType;

  constructor(private store: Store<CoreState>,
              private commentsStore: CommentsStore) {
    super();
  }

  ngOnInit() {
    this.comments$ = this.store.pipe(select(getCommentsEntitiesByNodeId(this.nodeId)));
  }

  onCommentAdded(comment: string) {
    this.store.dispatch(new AddComment(this.nodeId, comment));
  }

  onVote(comment: Comment, voteType: VoteType) {
    const newType = (comment.myVote && comment.myVote.vote === voteType) ? VoteType.ABSTAIN : voteType;
    const vote: IVote = {
      id: comment.myVote && comment.myVote.id,
      commentId: comment.id,
      vote: newType
    };
    this.store.dispatch(new UpdateCommentVote(this.nodeId, vote));
  }

  expandAddReplyTextBox(commentId: string): void {
    this.commentsStore.expandReplyTextBox(commentId);
  }
}

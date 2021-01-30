import { IVote, IVoteCount } from '@app/core/models/vote.model';

export interface IComment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;
  nodeTitle?: string;
  nodeContent?: string;
  documentTitle?: string;
  voteCount?: IVoteCount;
  myVote?: IVote;
  replies?: Array<Comment>;
}

export class Comment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;
  nodeTitle: string;
  nodeContent: string;
  documentTitle: string;
  voteCount?: IVoteCount;
  myVote?: IVote;
  replies?: Array<Comment>;

  constructor(data?: IComment) {
    if (data) {
      this.fromJson(data);
    }
  }

  fromJson(data: IComment) {
    this.id = data.id;
    this.text = data.text;
    this.user = data.user;
    this.lastEditDateTime = data.lastEditDateTime;
    this.nodeTitle = data.nodeTitle;
    this.nodeContent = data.nodeContent;
    this.documentTitle = data.documentTitle;
    this.voteCount = data.voteCount;
    this.myVote = data.myVote;
    this.replies = data.replies;
  }

  toJson(): IComment {
    return {
      id: this.id,
      text: this.text,
      user: this.user,
      lastEditDateTime: this.lastEditDateTime,
      nodeTitle: this.nodeTitle,
      nodeContent: this.nodeContent,
      documentTitle: this.documentTitle,
      voteCount: this.voteCount,
      myVote: this.myVote,
      replies: this.replies
    };
  }
}

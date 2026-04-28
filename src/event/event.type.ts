import { CommentEventDocument } from './comment-event.schema';
import { LikeEventDocument } from './like-event.schema';

export type EventUnion = CommentEventDocument | LikeEventDocument;

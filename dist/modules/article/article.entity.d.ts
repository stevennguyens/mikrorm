import { BaseEntity } from '../common/base.entity.js';
import { User } from '../user/user.entity.js';
export declare class Article extends BaseEntity {
    slug: string;
    title: string;
    description: string;
    text: string;
    author: User;
}

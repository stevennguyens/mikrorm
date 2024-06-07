import { OptionalProps } from '@mikro-orm/core';
export declare abstract class BaseEntity {
    [OptionalProps]?: 'createdAt' | 'updatedAt';
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

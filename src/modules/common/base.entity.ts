import { Entity, PrimaryKey, Property, OptionalProps } from "@mikro-orm/core";

@Entity()
export class BaseEntity<Optional = never> {
    [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional;

    @PrimaryKey()
    id!: number;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
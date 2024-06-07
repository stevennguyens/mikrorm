import { Entity, Property, OneToMany, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity.js";
import crypto from 'crypto';
import { Article } from "../article/article.entity.js";

@Entity()
export class User extends BaseEntity<'bio'> {
    @Property()
    fullName!: string;

    @Property()
    email!: string;

    @Property({ hidden: true, lazy: true })
    password!: string;

    @Property({ type: 'text' })
    bio = '';

    @OneToMany({ mappedBy: 'author' })
    articles = new Collection<Article>(this);

    constructor(fullName: string, email: string, password: string) {
        super();
        this.fullName = fullName;
        this.email = email;
        this.password = User.hashPassword(password);
    }

    static hashPassword(password: string) {
        return crypto.createHmac('sha256', password).digest('hex');
    }
}
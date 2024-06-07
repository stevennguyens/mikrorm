var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, ManyToOne, Property, t } from '@mikro-orm/core';
import { BaseEntity } from '../common/base.entity.js';
let Article = class Article extends BaseEntity {
    slug;
    title;
    description;
    text;
    author;
};
__decorate([
    Property({ unique: true })
], Article.prototype, "slug", void 0);
__decorate([
    Property({ index: true })
], Article.prototype, "title", void 0);
__decorate([
    Property({ length: 1000 })
], Article.prototype, "description", void 0);
__decorate([
    Property({ type: t.text, lazy: true })
], Article.prototype, "text", void 0);
__decorate([
    ManyToOne()
], Article.prototype, "author", void 0);
Article = __decorate([
    Entity()
], Article);
export { Article };

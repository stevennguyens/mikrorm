import { MikroORM } from "@mikro-orm/core";
import { User } from "./modules/user/user.entity.js";
import { Article } from "./modules/article/article.entity.js";
import { Tag } from "./modules/article/tag.entity.js";

const orm = await MikroORM.init();

await orm.schema.refreshDatabase();

// const user = new User('Foo Bar', 'foo@bar.com', '123456');
// console.log(user);

const em = orm.em.fork();

// await em.persist(user).flush();

em.clear();

// const article = em.create(Article, {
//     title: 'Foo is Bar',
//     text: 'Lorem impsum dolor sit amet',
//     author: user.id,
// });

// await em.persist(article).flush();
// console.log(article);

const user = await em.findOneOrFail(User, 1, { populate: ['articles'] });
console.log(user);

if (!user.articles.isInitialized()) {
    await user.articles.init();
}

await user.articles.loadItems();

for (const article of user.articles) {
    console.log(article.title);
    console.log(article.author.fullName);
}

const [article] = user.articles;
const newTag = em.create(Tag, { name: 'new' });
const oldTag = em.create(Tag, { name: 'old'});
article.tags.add(newTag, oldTag);
await em.flush();
console.log(article.tags);

// console.log('user id is:', user.id);

// const myUser = await em.findOne(User, user.id);
// console.log('users are the same:', user === myUser);

// user.bio = '...';
// await em.flush();

// const em2 = em.fork();
// console.log('verify the EM ids are different:', em.id, em2.id);
// const myUser2 = await em2.findOneOrFail(User, user.id);
// console.log(
//     'users are no longer the same, as they came from different EM:',
//     user === myUser2
// );

// myUser2.bio = 'changed';
// await em2.refresh(myUser2);
// console.log('changes are lost', myUser2);

// myUser2!.bio = 'some change, will be saved';
// await em2.flush();
// await em2.remove(myUser2).flush();
// await orm.close();


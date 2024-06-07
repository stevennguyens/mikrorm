import { MikroORM } from "@mikro-orm/core";
import { User } from "./modules/user/user.entity.js";
import { Article } from "./modules/article/article.entity.js";
const orm = await MikroORM.init();
await orm.schema.refreshDatabase();
const user = new User();
user.email = 'foo@bar.com';
user.fullName = 'Foo Bar';
user.password = '123456';
const em = orm.em.fork();
await em.persist(user).flush();
em.clear();
const article = em.create(Article, {
    title: 'Foo is Bar',
    text: 'Lorem impsum dolor sit amet',
    author: user.id,
    slug: "Foo",
    description: "Foo is bar"
});
await em.persist(article).flush();
console.log(article);
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

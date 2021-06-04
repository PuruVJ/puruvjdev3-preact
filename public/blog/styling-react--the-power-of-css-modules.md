---
title: The power of CSS Modules 💪
description: CSS Modules are extremely powerful. Find out why in this article.
date: 14 June, 2021
---

CSS Modules are one of the best ways of styling in React. We have libraries that people consider better than CSS Modules, but CSS Modules have stood the test of time and are still one of the most universal ways of styling React. They give you superpowers, and are simple enough that even beginners can grasp it.

# Advantages

1. **Scoped** - CSS modules are scoped when you use them the right way.
2. **Highly composable** - You can compose different styles in a lot of ways
3. **Tree shakable** - Styles you don't use are removed, just like modern JS tooling.
4. **Very easy to pick up** - CSS Modules are very easy to understand and takes almost no effort to start using.
5. **It's just CSS!!** - CSS Modules are just CSS that you write with some specific rules in mind. You get the great tooling from your IDE, and IDEs are really good at plain ol' CSS.
6. **PostCSS tooling just works** - Because CSS Modules are just CSS, all of your PostCSS tooling will work flawlessly.

# Prerequisites

- Basic knowledge of CSS.
- Have worked with React before.
- Hungry to learn 😋.

So we have seen the advantages and why you should learn CSS Modules. Now let's actually look at the syntax

# The syntax

Let's build a little Card component.

This will be our directory structure 👇

```txt
|- Card.jsx
|- Card.module.css
```

Notice we're naming our CSS file a `*.module.css`. This is a convention that is good to follow, and in a lot of build tools, is actually necessary, if you want the file to be processed as a CSS Module file.

Now let's look at the CSS file.

```css
/* Card.module.scss */

.container {
}

.avatar {
}

.userInfo {
}

.userName {
}

.userStatus {
}
```

Your CSS naming sense might be going off looking at the `.userInfo` and `.userName`. Shouldn't they be named `.user-info` and `.user-name`? Isn't that the main naming convention? Short answer: Yes, we're going off a bit on the tradition and naming things like we name things in JS. Bear with me, the reason will be clear in a while.

And how to use this CSS Module file in your react component?

Look at this 👇

```js
import './Card.module.scss';

export const Card = () => {
  return (
    <section className="container">
      <img className="avatar" src="..." />
      <div className="userInfo">
        <div className="userName">...</div>
        <div className="userStatus">...</div>
      </div>
    </section>
  );
};
```

This looks good! This is how we generally style our components in React, just import the CSS file as a module and it's included in the bundle.

**Wrong** ❌❌

This not how we use CSS Modules. For the advantages of CSS Modules, we gotta change how we write out `className`s.

Here's how we'd use our CSS Module actually 👇

```js
import css from './Card.module.scss';

export const Card = () => {
  return (
    <section className={css.container}>
      <img className={css.avatar} src="..." />
      <div className={css.userInfo}>
        <div className={css.userName}>...</div>
        <div className={css.userStatus}>...</div>
      </div>
    </section>
  );
};
```

![Wait what!?!?](../assets/media/css-modules--wait-what-kevin-hart.gif)

If you're just wondering what happened here, you're not alone. CSS Modules can feel weird coming from writing plain CSS and referencing the `class` and styles directly.

So, a few observations here:

1. We're importing the CSS Module file as a module using a default import, naming it `css`. You can name it `styles` or `classes` or `confetti`. Totally up to you!

2. Instead of regular static strings, we're using `css.*` values. Its as if the `classes` we defined in the CSS file are actually being exported as variables of an ES Module, kinda like this 👇

```js
export const container = '...';
export const avatar = '...';
export const userInfo = '...';
export const userName = '...';
export const userStatus = '...';
```

This is the reason why we used <mark>Camel Casing</mark> while naming our CSS classes. Because if there was a `dash-` used in the name, using it would be very dirty 👇

```js
import css from './Card.module.scss';

export const Card = () => {
  return (
    <section className={css.container}>
      <img className={css.avatar} src="..." />
      <div className={css['user-info']}>
        <div className={css['user-name']}>...</div>
        <div className={css['userStatus']}>...</div>
      </div>
    </section>
  );
};
```

See? Not as clean anymore.

## Under the hood

What goes on under the hood is very interesting. Let's have a look at what this file you're importing from becomes 👇

```js
export const container = '_container_bslv0_1';
export const avatar = '_avatar_bslv0_8';
export const userInfo = '_userInfo_bslv0_14';
export const userName = '_userName_bslv0_21';
export const userStatus = '_userStatus_bslv0_40';
export default {
  container: container,
  avatar: avatar,
  userInfo: userInfo,
  userName: userName,
  userStatus: userStatus,
};
```

As you can see, literally variables named the same as our classes are being defined by our build tools, and these variables are being exported separately(using named exports), and as an object in a default export.

As for the contents of these variables, you can see they contain the `classes` we defined, but these classes have some random strings around them. This is where the scoping happens.

Your CSS file's classes are basically mangled, and converted into this 👇

```css
._container_bslv0_1 {
}

._avatar_bslv0_8 {
}

._userInfo_bslv0_14 {
}

._userName_bslv0_21 {
}

._userStatus_bslv0_40 {
}
```

And their names are stored as variables in this JS module that you saw above.

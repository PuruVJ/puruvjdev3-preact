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

And their names are stored as variables in this JS module that you saw above. This is the complete mechanism of CSS Modules.

Now that we're done with how CSS Modules work and the basic syntax, let's get into the nitty-gritty!

## Using with Pre-processors and PostCSS

CSS Modules work seamlessly with pre-processors like **SASS**, **LESS**, **Stylus**, etc, and also with PostCSS, so any PostCSS config you have will work just fine.

## Gotchas

With everything great, there are some limitations. Here are the things you gotta watch out for.

### No styling the IDs!!

CSS Modules scope only the classes. They don't scope you styling the IDs, or tag names directly, as in, trying this 👇

```css
.someStyleClass {
}

img {
  display: none;
}
```

will mangle the className, thus scoping it, but the style applied to `img` there won't be scoped, rather it would be global, and hence, all the `img`s in your app will have `display: none` applied to them, which if you ask me, is nothing short of a disaster 😅

However, you can achieve this behavior by putting the img as a descendent of the root element in the component. In simple words, this 👇

```css
.container {
}

.container img {
  display: none;
}
```

`.container` class would mangled and scoped, so ultimately, your `img`'s styling will be applied only in this component, nowhere else!

Same with styling `Id`s 👇

```css
.container {
}

.container #image {
  display: none;
}
```

# The delicious parts 😋

CSS Modules come with some very tasty stuff. They don't just offer scoping, but so much more. Here are some of them.

## :global

Sometimes, you need to opt out of scoping for some specific styles. Let's take for example, applying special style when body has a specific class

```css
.header {
  color: green;
}

body.dark .header {
  color: blue;
}
```

This works pretty well, you don't need any globalising here. But say, you're using SCSS, and your `.header` is nested in another selectors 👇

```scss
.container {
  .someRandomDiv {
    .header {
      color: green;
    }

    body.dark .header {
      color: blue;
    }
  }
}
```

This won't work, as after SCSS compilation, the code would look something like this 👇

```css
.container .someRandomDiv body.dark .header {
  color: blue;
}
```

As you can clearly see, it expects `body` as a child now, but that simply isn't possible. What we need is body being the top most selector

```css
body.dark .container .someRandomDiv .header {
  color: blue;
}
```

This is what we desire. How to do this?

This is what exactly CSS Modules' `:global` selector is for. We want to make `body.dark` global, and so, we can simply re-write the SCSS code like this 👇

```scss
.container {
  .someRandomDiv {
    .header {
      color: green;
    }

    :global(body.dark) .header {
      color: blue;
    }
  }
}
```

Now This whole selector will be made global, and we'll get the desired output.

## Composing multiple styles together

In CSS Modules, you can basically create a single class, and then compose it within other classes. Here's what I mean 👇

```css
.classA {
  background-color: green;
  color: white;
}

.classB {
  composes: classA;
  color: blue;
}
```

As you can see, `.classB` has a special property `composes`, and its value is `classA`. This is how `composes` works: You pass the class name you want incorporated into your style as the value for `composes`.

And in fact, you're not limited to classes defined in the same file. The class to be composed can come from another CSS file 👇

```css
.classB {
  composes: classA from './classB.css';
  color: blue;
}
```

This syntax looks a little weird, but once you get used to it, there's no going back!

Composition in CSS Modules allow you to build reusable styles, and whole Design Systems. You could build your own [Tailwind](https://tailwindcss.com/) and [Windi](https://windicss.org/)! Quite exciting, right!?!? 😻😻

## Variables

CSS Modules have their own variable system too!!

```css
@value blue: #0c77f8;
@value red: #ff0000;
@value green: #aaf200;

.button {
  color: blue;
  display: inline-block;
}
```

As you can see, there's some trickery going on here!! `red`, `green` and `blue` are colors already defined in browser, but I assume you'll agree with me, that they are horribly ugly!

So here, we're simply redefining these colors for our own purposes. This is some wizardry that SCSS/LESS/CSS variables simply can't achieve, so CSS Modules variables have some serious edge here.

And you can basically import these in other files

```css
/* import your colors... */
@value colors: "./colors.css";
@value blue, red, green from colors;

.button {
  color: blue;
  display: inline-block;
}
```

Super good!!

OFC, these variables aren't live. As in during compile time, these variables are stripped away and they are replaced with their actual values. So if you are planning on changing some global variables for theme switching purposes, you can't do that, you'll have to go the [CSS variables path](https://blog.logrocket.com/how-to-create-better-themes-with-css-variables-5a3744105c74/) for that!

---
title: All the ways of styling React
description: React itself doesn't come with any styling solution. So the community came with its own solutions. Here's a list of them.
date: 14 May, 2021
cover_image: media/all-ways-style-react--cover.jpg
---

![Cover image](../assets/media/all-ways-style-react--cover.jpg)

> Photo by [Johannes Plenio](https://unsplash.com/photos/E-Zuyev2XWo)

React itself doesn't come with any styling solution out of the box. You can look at the docs, but you won't find a "the-way" to do styling. So the awesome community have come up with ways of styling, and boy, there are a lot of those. So I'm going to cover quite a lot of them in this article. Read on!

When it comes to React ecosystem, we can safely divide these into 2 categories: CSS in CSS🙄 and CSS-in-JS.

# CSS in CSS

Oldest trick in the book of writing CSS: Write in `.css` files(Or `.scss` or `.less` or `.styl`. You name it 😁).

Now, generally, if you have a medium/large-sized app, writing all your styles in plain CSS files is not a good idea, as sometimes, due to the size of the app, you may forget an existing selector and reuse it for some other block, and voila!! You have super weird styling that you have absolutely no idea how it got there.

## CSS BEM

CSS BEM helps elevate that. Its not some external code, not a package, not a library. It's a methodology. It's a bunch of rules you remember while writing your CSS.

BEM stands for **Block**-**Element**-**Modifier**

Block would be this:

```css
.btn {
}
```

This here 👇 is the **Element**, that depends on the block (`.btn` in this case)

```css
.btn__price {
}
```

And finally, some modifiers to change the look of the **Block** 👇

```css
.btn--orange {
}
.btn--big {
}
```

### Advantages

1. You get scoping just by naming things.

### Disadvantages

1. The HTML and CSS can turn horribly messy with these huge names, like this 👇

```js
export const Card = () => {
  return (
    <section className="card">
      <img className="card__avatar" src="..." />
      <div className="card__info">
        <div className="card__info__title">...</div>
        <div className="card__info__description">...</div>
      </div>
    </section>
  );
};
```

And the Styling follows:

```css
.card {
}

.card__avatar {
}

.card__info {
}

.card__info__title {
}

.card__info__description {
}
```

See the problem here? Both the HTML and CSS will look messy and hard to scan because of so much duplication.

(This still looks **OK**, but when your app grows and there are 1000s of these, things will become messy)

2. It's easy to forget to write rules in BEM and forget to fix it up later, causing bugs later on.

## SCSS (& SASS)

SCSS is the next best thing really. Say you have this little component 👇

```js
export const Card = () => {
  return (
    <section className="card">
      <img className="avatar" src="..." />
      <div className="info">
        <div className="title">...</div>
        <div className="description">...</div>
      </div>
    </section>
  );
};
```

Then the styling would be as simple as this 👇

```scss
.card {
  .avatar {
  }

  .info {
    .title {
    }

    .description {
    }
  }
}
```

As you can see, we have a really great sense of hierarchy here, just by indentation. And its very familiar, because it is similar to how hierarchy is presented in HTML, so this is very easy to scan.

And the options here are limitless. If you want a flat structure but still want scoping, just do it like this 👇

```scss
.card {
  .avatar {
  }

  .info {
  }

  .title {
  }

  .description {
  }
}
```

We have a completely flat structure here. The only indentation we need is for everything to be inside `.card` for scoping.

### Advantages

1. Very clean and readable
2. Minifies better than BEM

### Disadvantages

1. Introduces an extra build step(Though its not a huge problem if you use something like Snowpack or Vite or WMR, the support is built-in)
2. Have to learn extra rules.

## CSS Modules

It's quite a hybrid way of writing CSS. Hybrid in the sense that you write plain old CSS(or `SCSS` or `LESS` etc), but it doesn't get applied directly. rather, you have to `import` the rules from the CSS files in your JS and use them.

So lets look the SCSS file we had 👇

```scss
.card {
  .avatar {
  }

  .info {
  }

  .title {
  }

  .description {
  }
}
```

Let's make it flat 👇

```css
.card {
}

.avatar {
}

.info {
}

.title {
}

.description {
}
```

Now, lets assume that this file is named `Card.module.css`, and the component we saw above is named `Card.tsx`(Or `Card.js` or `Card.jsx`. Depends on your personal preference. Me, I'm a TypeScript guy 🙃)

So here's how you would use these styles in that file

```js
import css from './Card.module.css';

export const Card = () => {
  return (
    <section className={css.card}>
      <img className={css.avatar} src="..." />
      <div className={css.info}>
        <div className={css.title}>...</div>
        <div className={css.description}>...</div>
      </div>
    </section>
  );
};
```

> If your mind is going crazy looking at this, I understand. Happened to all of us when we first looked at CSS modules 😄.

So, as you can see, I'm importing the `Card.module.css` as if it were an actual JS module, and just referencing the class as if they were being exported from this "module". It works really well, and it's very comfortable to write this syntax once you get used to it.

It completely scopes the CSS. That is, if you take a peek at the production CSS, it will look something like 👇

```css
.card-gfh54y {
}

.avatar-trbgr5 {
}

.info-kvgs4326 {
}

.title-gchv98 {
}

.description-chgct231j {
}
```

All these classes are given an extra hash. Now if you use the same selector in another CSS Module, these selectors won't clash, as they'll both be very different.

# CSS in JS

CSS in JS, unlike plain ol' BEM in <mark>CSS in CSS</mark>, is not a methodology. It's just different libraries that try to solve problems with styling in very different ways. They are all very very different, and have made the platform much better. Some are revolutionary. Some are simple and down to earth, but have solved the smallest but most painful problems in Styling and other things.

So on with them!!

## JSS

JSS allows you to write all your CSS in plain old JS objects. Let's look at the same example from above, just in JSS style 👇

```js
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  card: {
    /* Card Styles */
  },
  avatar: {
    /* Avatar Styles */
  },
  info: {
    /* Info Styles */
  },
  title: {
    /* Title Styles */
  },
  description: {
    /* Description Styles */
  },
});

export const Card = () => {
  const css = useStyles();

  return (
    <section className={css.card}>
      <img className={css.avatar} src="..." />
      <div className={css.info}>
        <div className={css.title}>...</div>
        <div className={css.description}>...</div>
      </div>
    </section>
  );
};
```

As you can see, instead of an external CSS file, out styles are actually an object created by `createUseStyles` function, and these styles live in the same file. This allows your related code to be collocated in one place, which is quite good in technologies like React.

And you simply use these styles as a hook in your `card` component the same way we referred to our styles in the CSS Modules way. or you can destructure classes from it and directly use them.

```js
export const Card = () => {
  const { card, avatar, info, title, description } = useStyles();

  return (
    <section className={card}>
      <img className={avatar} src="..." />
      <div className={info}>
        <div className={title}>...</div>
        <div className={description}>...</div>
      </div>
    </section>
  );
};
```

And yes, these styles are 100% scoped. In fact that's the case with every single CSS in JS libraries listed below. All of em have scoping by default.

### Advantages

1. All relevant styles co-located in one place(Preferential. You can keep these styles in their own dedicated files. It's just personal preference)

2. Great for Design systems. As its just plain ol JS, creating design systems is very very easy and effective here.

3. All styles 100% Scoped.

4. SCSS like syntax to style a selector within a selector within a selector... and so on. You get the idea 😁

![Recursive Doge](../assets/media/all-ways-style-react--recursive-doge.gif)

### Disadvantages

1. Unnatural writing style: Writing styles in a JS object can feel foreign to a lot of devs. And if you're a VSCode user, and have a slow machine, the experience might be terrible for you, due to VSCode trying to fetch the next autocomplete from the huge set of CSS properties it has in the internal typings.

2. Less performant: CSS being populated by JS rather than put into an external stylesheet can make the overall experience slower, reducing the performance and degrading the User Experience.

3. Higher bundle size: Well, JSS isn't free. It has its own bundle size that is added to your own bundle (22.3 KB minified, 6.6KB min+gzip). Not a lot for most users, but it might be for your own use cases. Tread carefully.

## Styled Components

`styled-components` is personally, my most favorite way of writing styles in React. It offers an amazing API of writing CSS, using it, and overall it's just really good.

So let's rewrite our customary `Card` component in styled components and see how it holds up

```js
import styled from 'styled-components';

export const Card = () => {
  return (
    <Card>
      <Avatar src="..." />
      <Info>
        <Title>...</Title>
        <Description>...</Description>
      </Info>
    </Card>
  );
};

const Card = styled.section`
  /* Card styles */
`;

const Avatar = styled.img`
  /* Avatar styles */
`;

const Info = styled.div`
  /* Info styles */
`;

const Title = styled.div`
  /* Title styles */
`;

const Description = styled.div`
  /* Description styles */
`;
```

Behold!!! Just look at how amazingly beautiful this code looks

## Emotion

## Goober

## Linaria

## styled-jsx

## Stitches

## Vanilla Extract

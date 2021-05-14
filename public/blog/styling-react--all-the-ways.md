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

> If your mind is going crazy looking at this, I understand. Happened to all of us when we first looked at CSS modules 😄

So, as you can see, I'm importing the ``

# CSS in JS

## JSS

## Emotion

## Styled Components

## Linaria

## styled-jsx

## Goober

## Stitches

## Vanilla Extract

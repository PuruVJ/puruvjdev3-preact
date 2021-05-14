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

1. You get scoping just by naming things

### Disadvantages

1. The HTML and CSS can turn horribly messy with these huge names, like this 👇

```html
<a class="btn btn--big btn--orange" href="https://css-tricks.com">
  <span class="btn__price">$9.99</span>
  <span class="btn__text">Subscribe</span>
</a>
```

(This still looks maintainable, but ones your app grows and there are much more elements in it, things will become messy)

## SCSS

## CSS Modules

# CSS in JS

## JSS

## Emotion

## Styled Components

## Linaria

## styled-jsx

## Goober

## Stitches

## Vanilla Extract

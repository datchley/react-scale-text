# React ScaleText Component

[![NPM Version](https://img.shields.io/npm/v/react-scale-text.svg)](https://www.npmjs.com/package/react-scale-text)
[![Coverage Status](https://coveralls.io/repos/github/datchley/react-scale-text/badge.svg?branch=master)](https://coveralls.io/github/datchley/react-scale-text?branch=master)
[![Build Status](https://travis-ci.org/datchley/react-scale-text.svg?branch=master)](https://travis-ci.org/datchley/react-scale-text)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

`ScaleText` is a component that allows for dynamically sizing the text within a given component to fit its parent container's width and height. It should work with various positioning and should scale the text smoothly. The scaling of an elements text is done on initial render, and then triggered again from a window resize, which should keep the child element's text scaled to the parent's dimensions.

View [demo](https://datchley.github.io/react-scale-text/) page.

# Installation

Install as npm module and then Use via `import` or `require`

```
npm install --save react-scale-text
```

```js
import ScaleText from "react-scale-text";
```

or include the UMD build via script tag from CDN:

```html
<script src="https://unpkg.com/react-scale-text@latest/lib/react-scale-text.js"></script>
```

or, use the minified version, `https://unpkg.com/react-scale-text@latest/lib/react-scale-text.min.js`.
The UMD build makes the component `ScaleText` available globally for use in the script.

# Usage

`ScaleText` wraps a single Element. Upon render it will scale the text (`font-size`) of that element to match the width and height of
the parent element (`ScaleText`'s direct parent). Upon resize of the browser window after the intial render, it will ensure the text is always
scaled to match the parent container's dimensions.

## Example

```jsx
<div className="parent" style={{ width: "400px", height: "400px" }}>
  <ScaleText>
    <p className="child">Some text</p>
  </ScaleText>
</div>
```

In the above example, the `p` elements font-size would be scaled to match the width/height of the the `div.parent` element that contains it on initial render, and thereafter, on any window resize event. With no `minFontSize` or `maxFontSize` props, the text will scale infinitely with the `div.parent` element as it is resized.

## `widthOnly` Example

```jsx
<div className="parent" style={{ width: "100%", height: "400px" }}>
  <ScaleText widthOnly={true}>
    <p className="child">Some text</p>
  </ScaleText>
</div>
```

The above example, using the `widthOnly` prop tells `ScaleText` to only scale its child element based on the parent's width, not the height. This essentially turns off overflow checking on height to allow the element to scale to the full width of the container. You can then control the height directly via CSS or other means.

## Props

This component takes a single `Element` as a child to render, which is required.

There are two optional props that can be passed.

* **minFontSize** - the minimum font size to scale down to (_floor_) - default `Number.NEGATIVE_INFINITY`
* **maxFontSize** - the maximum font size to scale up to (_ceiling_) - default `Number.POSITIVE_INFINITY`
* **widthOnly** - will scale the element based on the width of it's container only, not the height - default `false`

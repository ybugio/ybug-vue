# Ybug-vue

A simple Vue 3 wrapper for
[Ybug's](https://ybug.io) [Feedback Widget API](https://ybug.io/docs/installation). 

For Vue 2 version of the plugin please check this gist: [Ybug Plugin for Vue 2](https://gist.github.com/hernest/981a81d734928db84d00deaca548609b).

## Installation

```bash
npm install --save ybug-vue
```

## Setup 
Install the plugin. You can use any setting mentioned in the [documentation](https://ybug.io/docs/installation).
```javascript
import { createApp } from 'vue';
import Ybug from 'ybug-vue';

const app = createApp({});

app.use(Ybug, {
    id: 'Your Project ID goes here',
    /* optional options */
    settings: {
        language_override: 'cs',
        /* ... */
    }
});
```

## Usage
You can use any method mentioned in the official documentation.

### Usage with Composition API
You can `inject('ybug')` in your Composition API components.

```vue
<script setup>
import { inject } from "vue";
const ybug = inject("ybug");
</script>

<template>
  <button @click="ybug.open('feedback')">Feedback</button>
</template>
```

### Usage with Options API
`ybug-vue` plugin exposes `$ybug` object in components using the Options API.

```vue
<template>
  <button @click="$ybug.open('feedback')">Feedback</button>
</template>
```
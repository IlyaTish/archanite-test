<template lang='pug'>
  svg.icon(
    :width='width'
    :height='height'
    :viewBox='viewBox'
    aria-hidden='true' 
    focusable='false'
    role='img'
    xmlns='http://www.w3.org/2000/svg'
  )
    path(
      :fill='fill'
      :d='path'
    )
</template>

<script>
  import icons from '@/data/icons.json';

  export default {
    props: {
      width: {
        type: [Number, String],
        default: 18
      },
      height: {
        type: [Number, String],
        default: 18
      },
      viewBox: {
        type: String,
        default: '0 0 20 20'
      },
      name: String,
      fill: {
        type: String,
        default: '#000000'
      }
    },
    computed: {
      path() {
        return icons[this.name];
      }
    }
  }
</script>
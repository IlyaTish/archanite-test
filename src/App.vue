<template lang='pug'>
  #app
    HeaderBlock
    HeaderNavBlock
</template>

<script>
  import HeaderBlock from './components/header/component'
  import HeaderNavBlock from './components/header-nav/component'

  export default {
    name: 'App',
    components: {
      HeaderBlock,
      HeaderNavBlock
    }
  }
</script>

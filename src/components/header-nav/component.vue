<template lang='pug'>
  header.header-nav
    .container
      .header-nav__cont
        ul.header-nav__list
          swiper.main-swiper(
            ref='header-nav-swiper'
            :options='swiperOptions'
          )
            swiper-slide(
              v-for='(item, index) in items'
              :key='index'
            )
              li.header-nav__item(
                :class='{ active: index === activeItem }'
                @click='activeItem = index'
              ) {{ item.txt }}
                .header-nav__icon-cont(v-if='item.icon')
                  chevron-down
</template>


<script>
  import Items from './data'
  import ChevronDown from '@/assets/icons/chevron-down-icon'

  // Styles
  import './styles.sass'
  import './responsive.sass'

  export default {
    components: {
      ChevronDown
    },

    data() {
      return {
        items: Items.ITEMS,
        activeItem: 0,
        swiperOptions: {
          direction: 'horizontal',
          slidesPerView: 'auto',
          mousewheel: {
            forceToAxis: true,
          }
        }
      }
    }
  }
</script>

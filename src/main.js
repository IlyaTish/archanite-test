import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import GooglePlacesAutocompletePlugin from 'vue-better-google-places-autocomplete'
import {
  Swiper as SwiperClass,
  Pagination,
  Navigation,
  Mousewheel,
  Autoplay,
} from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

import 'swiper/swiper-bundle.min.css'
import './assets/styles/styles.sass'

Vue.config.productionTip = false
Vue.use(GooglePlacesAutocompletePlugin)

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay])
Vue.use(getAwesomeSwiper(SwiperClass))

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

new Vue({
  render: h => h(App),
}).$mount('#app')

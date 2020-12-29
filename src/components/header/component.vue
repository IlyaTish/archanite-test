<template lang='pug'>
  header.header
    .container
      .header__cont
        img.logo(src='@/assets/images/header/logo.svg' alt='EDA')

        .address-input(
          :class='{ focused: focused }'
          v-click-outside='closeEvent'
        )
          .address-input__icon-cont
            map-marker

          .address-input__field-cont
            input.address-input__field.header-input(
              type='text'
              v-model='location'
              :class='{ focused: focused }'
              @input='focused = true'
              @click='focused = true'
              @keydown='itemsNavigate'
              @keypress='selectOnEnter($event)'
              placeholder='Введите адрес доставки'
            )

          .address-input__icon-cont.address-input__icon-cont--close(@click='clearInput')
            common-icon(width='16' height='17' viewBox='0 0 16 17' name='close')

          ul.address-list(
            v-if='location.length > 0 && focused && searchResults.length > 0'
          )
            li.address-list__item(
              ref='itemsNavigate'
              v-for='(result, index) in searchResults'
              :key='index'
              :class='{ focused: index === itemFocus }'
              @click='selectOnClick($event)'
            ) {{ result }}

        .search
          .search__icon-cont
            common-icon(width='25' height='25' viewBox='0 0 25 25' name='search')
          input.search__input.header-input(type='search' placeholder='Поиск')

        a.auth(href='#')
          .auth__icon-cont
            sign-in
          span.auth__txt Войти

        a.cart(href='#')
          common-icon(width='28' height='24' viewBox='0 0 28 24' name='cart')
</template>


<script>
  import ClickOutside from 'vue-click-outside'

  // Icons
  import CommonIcon from '@/assets/icons/common-icon'
  import MapMarker from '@/assets/icons/map-marker-icon'
  import SignIn from '@/assets/icons/sign-in-icon'

  // Styles
  import './styles.sass'
  import './responsive.sass'

  export default {
    components: {
      CommonIcon,
      MapMarker,
      SignIn
    },

    data() {
      return {
        location: '',
        searchResults: [],
        service: null,

        // Track focus of elements
        focused: true,
        itemFocus: null
      }
    },

    // Called when the JS file is downloaded (https://www.npmjs.com/package/vue-meta)
    metaInfo () {
      return {
        script: [{
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyDc4_0UwDKWMUJvBVj-xm7ySUgO0_iGEiU&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.mapInit()
        }]
      }
    },

    methods: {
      // mapInit() - the function that is called when the JS file is loaded
      mapInit() {
        this.service = new window.google.maps.places.AutocompleteService()
      },

      displaySuggestions(predictions, status) {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          this.searchResults = []
          return
        }
        this.searchResults = predictions.map(prediction => prediction.description) 
      },

      selectFilteredItem() {
        const filteredItem = this.searchResults.filter((item, index) => 
          this.itemFocus === index
        );

        this.location = filteredItem[0];
        this.focused = false
      },

      selectOnClick(e) {
        this.location = e.target.textContent;
        this.focused = false
      },

      selectOnEnter(e) {
        if (e.charCode === 13) this.selectFilteredItem()
      },

      // Navigate of items list (on keydown ↓ / keyup ↑)
      itemsNavigate: function(e) {
        switch (e.keyCode) {
          case 38:
            if (this.itemFocus === null) this.itemFocus = 0;
            else if (this.itemFocus > 0) this.itemFocus--;
            break;

          case 40:
            if (this.itemFocus === null) this.itemFocus = 0;
            else if (this.itemFocus < this.searchResults.length - 1) this.itemFocus++;
            break;
        }
      },

      closeEvent: function() {
        this.focused = false
      },

      clearInput: function() {
        this.location = '';
        this.focused = false
      }
    },

    watch: {
      location(newValue) {
        if (newValue) {
          this.service.getPlacePredictions({
            input: this.location
          }, this.displaySuggestions)
        }
      }
    },

    directives: {
      ClickOutside
    }
  }
</script>

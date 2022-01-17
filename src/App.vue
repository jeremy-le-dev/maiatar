<template>
  <div id="app" class="max-w-xl mx-auto p-5"><!-- Theme -->
    <div class="fixed top-0 right-0 bg-white rounded-bl-full block w-16 h-16 text-right p-2 dark:bg-gray-800 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 shadow-sm" @click="setTheme('inverse')">
      <i v-show="theme === 'light'" class="fas fa-moon fa-2x"></i>
      <i v-show="theme === 'dark'" class="fas fa-sun fa-2x"></i>
    </div>

    <div v-if="address" class="overflow-hidden rounded-full fixed top-2 left-2 bg-white p-1 pl-2 text-sm dark:bg-gray-800 dark:hover:text-blue-300 shadow-sm">
      <span class="text-gray-600" :title="address">{{ addressTruncated }}</span>
      &nbsp;
      <button class="text-gray-400 hover:text-blue-600 dark:hover:text-blue-300">
        <i class="far fa-clone"></i>
      </button>
      &nbsp;
      <button class="px-2 py-1 bg-blue-600 rounded-full text-white dark:bg-blue-300" @click="logout">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>

    <!-- Title -->
    <h1 class="text-4xl font-bold py-10 mx-auto text-center">
      <img v-show="theme === 'light'" src="./assets/elrond-avatar-dark.svg" width="50" alt="Elrond logo" class="inline-block m-3 align-middle"><img v-show="theme === 'dark'" src="./assets/elrond-light.svg" width="50" alt="Elrond logo" class="inline-block m-3">
      <span class="align-middle">Maiatar</span>
      <span class="text-xs text-blue-600 pl-2">Bêta</span>
    </h1>

    <!-- Avatar Generator & Payment -->
    <div class="text-center rounded-lg p-5 bg-white shadow-md border-t-4 border-blue-600 dark:bg-gray-800 dark:border-blue-300 relative">
      <AvatarGenerator :address="address"/>
      <div v-if="!address" class="bg-gray-800 bg-opacity-25 w-full h-full absolute top-0 left-0" style="z-index: 999;">
        <button @click="login" class="mt-32 bg-blue-600 px-3 py-2 text-2xl rounded font-semibold text-white dark:bg-blue-300">
          Login&nbsp;<i class="fas fa-bolt align-middle"></i>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="w-full text-center text-sm mt-5">
      Made with <i class="fas fa-heart text-red-600"></i> by <a href="https://twitter.com/maiatar_elrond" target="_blank" class="font-semibold hover:text-blue-600 dark:hover:text-blue-300">@maiatar_elrond</a>
    </div>
  </div>
</template>

<script>
import AvatarGenerator from "@/components/AvatarGenerator";

export default {
  name: 'App',
  components: {
    AvatarGenerator
  },
  data() {
    return {
      theme: 'light',
      address: this.$route && this.$route.query && this.$route.query.address || '',
    };
  },
  mounted() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    this.setTheme();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    addressTruncated() {
      return this.address.slice(0, 20) + '...';
    },
  },
  methods: {
    fetchData() {
      console.error('this.$route b', this.$route);
      this.address = this.$route && this.$route.query && this.$route.query.address || '';
    },

    /**
     * Login hook
     */
    login() {
      window.location.href = 'https://wallet.elrond.com/hook/login?callbackUrl='+document.URL;
    },

    /**
     * Logout hook
     */
    logout() {
      window.location.href = window.location.href.split('?')[0];
    },

    /**
     * Check if dark theme is applicable
     * @returns {boolean|boolean}
     */
    checkIfDarkTheme() {
      return this.theme === 'dark'
    },

    /**
     * Set Theme by mode
     * @param mode
     */
    setTheme(mode) {
      switch (mode) {
        case 'dark':
          localStorage.theme = 'dark';
          document.documentElement.classList.add('dark');
          this.theme = 'dark';
          break;
        case 'light':
          localStorage.theme = 'light'
          document.documentElement.classList.remove('dark');
          this.theme = 'light';
          break;
        case 'inverse':
          if (this.checkIfDarkTheme()) {
            this.setTheme('light');
          } else {
            this.setTheme('dark');
          }
          break;
        default:
          if (this.checkIfDarkTheme()) {
            this.setTheme('dark');
          } else {
            this.setTheme('light');
          }
          break;
      }
    }
  }
}
</script>

<template>
  <v-list nav dense>
    <v-list-item-group
      v-model="group"
      active-class="deep-purple--text text--accent-4"
    >
      <!-- <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item> -->

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>LogOut</v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    group: null
  }),
  mounted () {},
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('user/logout')
      } catch (error) {
        console.log(error)
      }
      this.$router.push(`/signin?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

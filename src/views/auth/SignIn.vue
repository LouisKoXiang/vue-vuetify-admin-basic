<template>
  <v-row no-gutters align="center" justify="center">
    <v-alert
      :value="showAlert"
      type="error"
      border="top"
      dense
      transition="scale-transition"
    >
      {{ errorMessage }}
    </v-alert>
    <v-col cols="12" sm="8" md="4" lg="4">
      <v-card class="elevation-5 pa-3">
        <v-card-text>
          <div class="layout column align-center">
            <h1 class="text-center my-4 primary--text">
              Vue Vuetify Admin Template
            </h1>
          </div>
          <v-form>
            <v-text-field
              v-model="loginForm.username"
              append-icon="mdi-account"
              name="username"
              label="信箱"
              required
            />
            <v-text-field
              v-model="loginForm.password"
              append-icon="mdi-lock"
              name="password"
              label="密碼"
              type="password"
              required
              autocomplete="current-password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" outlined to="/singup">
            {{ '註冊' }}
          </v-btn>
          <v-btn color="primary" :loading="loading" @click="login">
            {{ '登入' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SingIn',
  data: () => ({
    loading: false,
    loginForm: {
      username: 'test',
      password: 'password'
    },
    showAlert: false,
    errorMessage: ''
  }),
  $route: {
    handler: function (route) {
      this.redirect = route.query && route.query.redirect
    },
    immediate: true
  },
  methods: {
    async login () {
      console.log(this.loginForm, 'this.loginForm')
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
        })
        .catch(error => {
          this.toshowAlert(error)
        })
    },
    toshowAlert (error) {
      this.showAlert = true
      this.errorMessage = error.message
      const timer = this.toshowAlert.timer
      if (timer) {
        clearTimeout(timer)
      }
      this.toshowAlert.timer = setTimeout(() => {
        this.showAlert = false
      }, 3000)
    }
  }
}
</script>

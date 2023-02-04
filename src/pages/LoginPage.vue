<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          type="email"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && !!val.length) || 'E-mail is required']" />
        <q-input
          label="Password"
          type="password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && !!val.length) || 'Password is required']" />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit" />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            flat
            :to="{ path: 'register' }"
            size="sm"/>
          <q-btn
            label="Forgot Password?"
            color="primary"
            class="full-width"
            flat
            :to="{ path: 'forgot-password' }"
            size="sm"/>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

const router = useRouter()
const { login } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()
const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await login(form.value)
    notifySuccess('Login successfully!')
    router.replace({
      path: 'me'
    })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && !!val.length) || 'Name is required']"/>
        <q-input
          label="E-mail"
          type="email"
          v-model="form.email" lazy-rules
          :rules="[val => (val && !!val.length) || 'E-mail is required']"/>
        <q-input
          label="Password"
          type="password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length > 5) || 'Password is required and more than or equal 6 characteres']"/>
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit" />
          <q-btn
            label="Back"
            color="dark"
            class="full-width"
            rounded
            flat
            :to="{ path: 'login' }" />
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
const { register } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()
const form = ref({
  name: '',
  email: '',
  password: ''
})
const handleRegister = async () => {
  try {
    await register(form.value)
    notifySuccess()
    router.push({
      path: 'email-confirmation',
      query: { email: form.value.email }
    })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>

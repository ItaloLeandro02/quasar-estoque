<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="E-mail"
          type="email"
          v-model="email"
          lazy-rules
          :rules="[val => (val && !!val.length) || 'E-mail is required']"/>
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send Reset E-mail"
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
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

const email = ref('')
const { sendPasswordResetEmail } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()
const handleForgotPassword = async () => {
  try {
    await sendPasswordResetEmail(email.value)
    notifySuccess(`Password reset e-mail sent to: ${email.value}`)
  } catch (error) {
    notifyError(error.message)
  }
}
</script>

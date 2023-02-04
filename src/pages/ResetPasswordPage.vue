<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          type="password"
          v-model="password"
          lazy-rules
          :rules="[val => (val && val.length > 5) || 'Password is required and more than or equal 6 characteres']" />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send New Password"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

const password = ref('')
const { resetPassword } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()
const route = useRoute()
const { accessToken } = route.query
const router = useRouter()
const handlePasswordReset = async () => {
  try {
    await resetPassword(accessToken, password.value)
    notifySuccess('New Password Sent!')
    router.push({ path: 'login' })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>

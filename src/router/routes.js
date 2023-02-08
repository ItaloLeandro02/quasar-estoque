
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'email-confirmation', component: () => import('pages/EmailConfirmationPage.vue') },
      { path: 'forgot-password', component: () => import('pages/ForgotPasswordPage.vue') },
      { path: 'reset-password', component: () => import('pages/ResetPasswordPage.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', component: () => import('pages/MePage.vue') },
      { path: 'category', component: () => import('src/pages/category/CategoryListPage.vue') }
      // { path: '', component: () => import('pages/IndexPage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

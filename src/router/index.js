import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddCourse from '@/components/AddCourse'
import EditCourse from '@/components/EditCourse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/addcourse',
      name: 'AddCourse',
      component: AddCourse
    },
    {
      path: '/editcourse/:course_slug',
      name: 'EditCourse',
      component: EditCourse
    }
  ]
})

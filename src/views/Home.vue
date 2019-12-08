<template lang="pug">
StackPanel
  .content
    h1 Hello World!
    p Hello from Fenestron UI
    p {{message}}
    p(v-if="loading") Waiting on IPC...
    button(@click="tryIPC", v-else) Try IPC
</template>

<script>
import { MessageSender } from 'electron-ipc-helper'
export default {
  name: 'home',
  data: () => ({
    message: "What's IPC say?",
    loading: false
  }),
  components: {
  },
  methods: {
    tryIPC () {
      this.loading = true
      this.message = ''
      const sender = new MessageSender('exampleMessage')
      sender.send().then((message) => {
        this.loading = false
        this.message = message
      })
    }
  }

}
</script>

<style scoped>
.content {
  padding-left: 1em;
  padding-right: 1em;
}
</style>

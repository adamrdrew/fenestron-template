<template lang="pug">
.frame
  TitleBar(:back-button="true", title="Title Bar Example")
  SplitView(display-mode="overlay", :title-bar-offset="true")
    template(v-slot:pane="slotProps")
    template(v-slot:content)
      transition(name="page-slide-up")
        router-view
</template>

<script>

export default {
  data: () => ({
  }),
  computed: {
    route () {
      return this.$route.name
    }
  }
}
</script>

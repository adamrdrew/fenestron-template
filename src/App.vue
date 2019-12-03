<template lang="pug">
.frame
  TitleBar(:back-button="true", title="Title Bar Example")
  SplitView(display-mode="inline", :title-bar-offset="true")
    template(v-slot:pane="slotProps")
      PaneButton(navigate="home", icon="Home", title="Home", :paneOpen="slotProps.paneOpen")
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

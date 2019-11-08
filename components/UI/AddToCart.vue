<template>
  <button
    class="btn"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"><slot /></button>
</template>

<script>
export default {
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
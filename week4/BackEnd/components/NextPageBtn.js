export default {
  props: ['isEnabled',],
  emits: ['change-page',],
  template: `<li class="page-item"><button type="button" class="page-link" :class="{disabled: !isEnabled,}" @click="$emit('change-page')">Next</button></li>`,
}
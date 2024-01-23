export default {
  props: ['page', 'currentPage'],
  emits: ['change-page'],
  template: `<li class="page-item"><button type="button" class="page-link" :class="{active: currentPage == page}" :data-page="page"  @click="$emit('change-page', page)">{{page}}</button></li>`,
}
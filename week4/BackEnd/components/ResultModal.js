export default {
  props: ['serverMessage',],
  template: `<div class="modal fade" id="bsResultModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
  tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">
          {{ serverMessage.success ? '成功' : '失敗'}}
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {{ serverMessage.message }}
      </div>
      <div class="modal-footer">
        <button class="btn btn-normal-gray" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">關閉</button>
      </div>
    </div>
  </div>
</div>`,
}
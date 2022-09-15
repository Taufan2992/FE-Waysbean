import React from 'react'

function Modaldelete({setConfirmDelete}) {

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <div>
        <div class="modal" tabindex="-1" id="Modaldelete" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style={{borderBottom:'none'}}>
        <h5 class="modal-title">Delete Data</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want delete this data?</p>
      </div>
      <div class="modal-footer" style={{borderTop:'none'}}>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" style={{width:'100px'}}  onClick={handleDelete}>Yes</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style={{width:'100px'}}>No</button>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Modaldelete
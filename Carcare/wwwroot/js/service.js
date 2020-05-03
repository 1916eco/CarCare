var dataTable;

$(document).ready(function () {
    loadDataTable();
});


function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/admin/service/GetAll",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "category.name", "width": "20%" },
            { "data": "price", "width": "10%" },
            { "data": "frequency.frequencyCount", "width": "10%" },
            
            {
                "data": "id",                
                "render": function (data, type, row) {
                    var checked = "";
                    if (row.available)
                        checked = 'checked=""';
                    return `    
                            <div class="text-center"> 
                            <div class="custom-control custom-switch" style="float:left;margin-top:7px;">
                                  <input type="checkbox"  onclick="SetAvailable(${data},this)"   class="custom-control-input" id="customSwitch_${data}" ${checked}>
                                  <label class="custom-control-label" for="customSwitch_${data}">Available</label>
                                </div>
                            <a href="/Admin/service/Upsert/${data}" class='btn btn-success text-white' style='cursor:pointer; width:100px;' >
                                <i class='far fa-edit'></i> Edit
                            </a>
                            &nbsp;
                            <a class='btn btn-danger text-white' style='cursor:pointer; width:100px;' onclick=Delete('/admin/service/Delete/'+${data})>
                               <i class='far fa-trash-alt'></i> Delete
                            </a></div>
                        `;
                }, "width": "35%"
            }


        ],
        "language": {
            "emptyTable": "no data found."
        },
        "width": "100%"
    });
}

function Delete(url) {
    swal({
        title: "Are you sure want to Delete?",
        text: "You will not be able to restore the file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: 'DELETE',
            url: url,
            success: function (data) {
                if (data.success) {
                    toastr.success(data.message);
                    dataTable.ajax.reload();

                }
                else {
                    toastr.error(data.message);
                }
            }
        });
    });
}


function SetAvailable(id,btn) {
    var url = '/admin/service/SetAvailable';    
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: url,
        headers: {'content-Type':'application/json'},
        data: JSON.stringify({ id: id, available : btn.checked }),
        success: function (msg) {
            console.log(msg);
        }
    });
}

function addNewSmartPhone() {
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/api/smartphones",
        //xử lý khi thành công
        success: successHandler

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        //tên API
        url: "http://localhost:8080/api/smartphones",
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '    <table id="display-list"  border="1"><tr>\n' +
                '        <th>Producer</td>\n' +
                '        <th>Model</td>\n' +
                '        <th>Price</td>\n' +
                '        <th>Delete</td>\n' +
                '        <th>Update</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>"
            document.getElementById('smartphoneList').innerHTML = content;
            document.getElementById('smartphoneList').style.display = "block";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('display-create').style.display = "block";
            document.getElementById('title').style.display = "block";
        }
    });
}

function displayFormCreate() {
    document.getElementById('smartphoneList').style.display = "none";
    document.getElementById('add-smartphone').style.display = "block";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
}

function getSmartphone(smartphone) {
    return `<tr><td >${smartphone.producer}</td><td >${smartphone.model}</td><td >${smartphone.price}</td>` +
        `<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>`+
        `<td class="btn"><button class="updateSmartphone" onclick="dataUpdate(${smartphone.id})">update</button></td></tr>`;
}

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/api/smartphones/${id}`,
        //xử lý khi thành công
        success: successHandler
    });
}

function dataUpdate(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: function (data){
            let smartphone = data;
            // Lưu trữ dữ liệu trong localStorage
            localStorage.setItem('smartphone', JSON.stringify(smartphone));
            // Điều hướng đến trang update.html
            window.location.href = 'update.html';
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Lấy dữ liệu từ localStorage
    const smartphone = JSON.parse(localStorage.getItem('smartphone'));

    if (smartphone) {
        // Cập nhật các trường input với dữ liệu từ localStorage
        document.getElementById('producer').value = smartphone.producer || '';
        document.getElementById('model').value = smartphone.model || '';
        document.getElementById('price').value = smartphone.price || '';
    } else {
        console.error('No smartphone data found in localStorage.');
    }
});

// update.js
// Hàm cập nhật smartphone
function updateSmartphone(event) {
    // Ngăn chặn hành động mặc định của form
    event.preventDefault();

    // Lấy giá trị từ các ô input
    let id = $('#id').val();
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();

    // Tạo đối tượng smartphone đã cập nhật
    let updatedSmartphone = {
        producer: producer,
        model: model,
        price: price
    };

    // Gửi yêu cầu AJAX để cập nhật dữ liệu
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(updatedSmartphone),
        url: "http://localhost:8080/api/smartphones/" + id,
        success: function(response) {
            alert('Smartphone updated successfully!');
        },
        error: function(xhr, status, error) {
            alert('Error updating smartphone: ' + error);
        }
    });
}







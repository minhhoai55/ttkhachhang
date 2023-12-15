  $(document).ready(function () {
            fetchData();

            function fetchData() {
                $.ajax({
                    url: 'https://657b3de2394ca9e4af140ab0.mockapi.io/api/khachhang',
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        displayCustomers(data);
                    },
                    error: function (error) {
                        console.error('Error fetching data from API:', error);
                    }
                });
            }

            function displayCustomers(customers) {
                const customerListContainer = $('#customerList');

                customerListContainer.empty();

                customers.forEach(customer => {
                    const customerInfo = `<div class="customer-info">
                                            <p>Họ Tên: ${customer.hoten}</p>
                                            <p>Ngày Sinh: ${customer.ngaysinh}</p>
                                            <p>Giới Tính: ${customer.gioitinh}</p>
                                            <p>Số Điện Thoại: ${customer.phone}</p>
                                            <p>Quốc Gia: ${customer.quocgia}</p>
                                            <p>Nơi Ở: ${customer.noio}</p>
                                            <p>Email: ${customer.email}</p>
                                            <button class="edit-btn" onclick="editCustomer(${customer.id})">Chỉnh Sửa</button>
                                            <button class="delete-btn" onclick="deleteCustomer(${customer.id})">Xóa</button>
                                        </div>`;
                    customerListContainer.append(customerInfo);
                });
            }

            window.deleteCustomer = function (customerId) {
                $.ajax({
                    url: `https://657b3de2394ca9e4af140ab0.mockapi.io/api/khachhang/${customerId}`,
                    method: 'DELETE',
                    success: function () {
                        fetchData();
                    },
                    error: function (error) {
                        console.error('Error deleting customer:', error);
                    }
                });
            };

            window.editCustomer = function (customerId) {
                const newHoten = prompt("Nhập tên mới:");
                const newNgaySinh = prompt("Nhập ngày sinh mới:");
                const newGioiTinh = prompt("Nhập giới tính mới:");
                const newPhone = prompt("Nhập số điện thoại mới:");
                const newQuocGia = prompt("Nhập quốc gia mới:");
                const newNoiO = prompt("Nhập nơi ở mới:");
                const newEmail = prompt("Nhập email mới:");

                const updatedCustomer = {
                    hoten: newHoten,
                    ngaysinh: newNgaySinh,
                    gioitinh: newGioiTinh,
                    phone: newPhone,
                    quocgia: newQuocGia,
                    noio: newNoiO,
                    email: newEmail
                };

                $.ajax({
                    url: `https://657b3de2394ca9e4af140ab0.mockapi.io/api/khachhang/${customerId}`,
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedCustomer),
                    success: function () {
                        fetchData();
                    },
                    error: function (error) {
                        console.error('Error updating customer:', error);
                    }
                });
            };
        });
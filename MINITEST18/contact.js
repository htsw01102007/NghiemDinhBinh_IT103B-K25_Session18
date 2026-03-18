let contacts = [
  {
    name: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@email.com",
  },
  {
    name: "Trần Thị Bình",
    phone: "0912345678",
    email: "tranthibinh@email.com",
  },
  {
    name: "Lê Văn Cường",
    phone: "0923456789",
    email: "levancuong@email.com",
  },
  {
    name: "Phạm Thị Dung",
    phone: "0934567890",
    email: "phamthidung@email.com",
  },
  {
    name: "Hoàng Văn Em",
    phone: "0945678901",
    email: "hoangvanem@email.com",
  },
];

function renderContacts() {
  let str = "";
  contacts.forEach((contact, index) => {
    str += `
            <tr>
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit">Sửa</button>
                        <button class="btn-delete" onclick="deleteContact(${index})">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
  });
  document.getElementById("contact-tbody").innerHTML = str;
}

renderContacts();

function addContact() {
  event.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();
  const email = document.getElementById("contact-email").value.trim();

  if (!validateContact(name, phone, email)) {
    return;
  }
  
  let newContact = {
    name: name,
    phone: phone,
    email: email,
  };
  contacts.push(newContact);
  renderContacts();
}

function deleteContact(index) {
    contacts.splice(index,1);
    renderContacts();
}

function validateContact(name, phone, email, address) {
  // Validate họ tên
  if (!name || name.trim() === '') {
    alert('Họ tên không được để trống!');
    return false;
  }
  
  if (name.trim().length < 2) {
    alert('Họ tên phải có ít nhất 2 ký tự!');
    return false;
  }
  
  // Kiểm tra họ tên chỉ chứa chữ cái, khoảng trắng và dấu tiếng Việt
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!nameRegex.test(name.trim())) {
    alert('Họ tên không được chứa số hoặc ký tự đặc biệt!');
    return false;
  }
  
  // Validate số điện thoại
  if (!phone || phone.trim() === '') {
    alert('Số điện thoại không được để trống!');
    return false;
  }
  
  // Regex cho số điện thoại Việt Nam: 0xxxxxxxxx (10 số) hoặc +84xxxxxxxxx
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  if (!phoneRegex.test(phone.trim())) {
    alert('Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 chữ số (bắt đầu bằng 0) hoặc định dạng quốc tế (+84...)');
    return false;
  }
  
  // Validate email
  if (!email || email.trim() === '') {
    alert('Email không được để trống!');
    return false;
  }
  
  // Regex cho email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    alert('Email không hợp lệ!');
    return false;
  }
  
  // Kiểm tra trùng email (khi thêm mới)
  if (contacts.some(c => c.email.toLowerCase() === email.trim().toLowerCase())) {
    alert('Email đã tồn tại trong danh bạ!');
    return false;
  }
  
  // Validate địa chỉ (nếu có)
  if (address && address.trim() !== '' && address.trim().length < 5) {
    alert('Địa chỉ phải có ít nhất 5 ký tự!');
    return false;
  }
  
  return true;
}   
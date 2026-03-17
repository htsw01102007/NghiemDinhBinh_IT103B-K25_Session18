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
                        <button class="btn-delete">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
  });
  document.getElementById("contact-tbody").innerHTML = str;
}

renderContacts();

function addContact() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const email = document.getElementById("contact-email").value.trim();

    // if (!validateContact(name, phone, email)) {
    //   return;
    // }
    let newContact = {
      name: name,
      phone: phone,
      email: email,
    };
    contacts.push(newContact);

    renderContacts();
  });
}

let apiUrl = "http://localhost:8028/";

console.log(apiUrl)
// ดึงtag ที่อยู่ในตาราง

let search_admin = document.querySelector("#search");
/* page admin_info*/ 
let search_admin_submit = document.querySelector("#searchButton");
let select_all_admin = document.querySelector("#select_admin");


/* page add-admin*/ 
let add_admin_submit = document.querySelector("#add_admin_submit");
let fname_admin_input = document.querySelector("#txtfirstname");
let lname_admin_input = document.querySelector("#txtlastname");
let identity_admin_input = document.querySelector("#txtidentificationNo");
let address_admin_input = document.querySelector("#txtaddress");
let bday_admin_input = document.querySelector("#cldBD");
let id_admin_input = document.querySelector("#txtAdminID");
let tel_admin_input = document.querySelector("#txtPhonenumber");
let email_admin_input = document.querySelector("#txtemail");
let other_admin_input = document.querySelector("#txtothers");

/* page update-admin*/ 
let update_admin_submit = document.querySelector("#update_admin_submit");

/* page update-admin*/ 
let delete_admin_submit = document.querySelector("#delete_admin");



/* fetch สำหรับ select and select all*/
async function callAdmin(url, method) {
  console.log(url)
  let data;
  if (method == "selectall") {
    let response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();
  } else if (method == "select") {
    let response = await fetch(url, {
      method: "GET",
    });
    data = await response.json();
    console.log(data)
  } 

  return data;
}
  // fetch Add Admin
  async function callAddAdmin(url, method ,sentdata={} ) {
    console.log(url)
    let data;
    if(method == "insert"){
      let response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentdata),
      });
      data = await response.json();
    }else if (method == "update"){
      console.log("")
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentdata),
      });
      data = await response.json();
    }else if(method == "delete"){
      console.log("deleteee")
      let response = await fetch(url, {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentdata),
      });
      data = await response.json();
    }
    return data;
  }

  /* ถ้ากดปุ่ม delete*/
  if(delete_admin_submit){
    delete_admin_submit.addEventListener("click", ()=>{
      search_admin = search_admin.value;
      let admin_info = {
        id_admin:search_admin,
      };
      callAddAdmin(apiUrl + "admin_info", "delete", admin_info).then((data)=>{
        if(data.data > 0){
          alert(data.message);
        }
      })
    })
  }
  if(update_admin_submit){
    update_admin_submit.addEventListener("click",()=>{
      console.log("updateeee")
      console.log(fname_admin_input.value)
      fname_admin_input = fname_admin_input.value
      lname_admin_input = lname_admin_input.value
      identity_admin_input = identity_admin_input.value
      address_admin_input = address_admin_input.value
      bday_admin_input = bday_admin_input.value
      id_admin_input = id_admin_input.value
      tel_admin_input = tel_admin_input.value
      email_admin_input = email_admin_input.value
      other_admin_input = other_admin_input.value
  
      let admin_infos = {
        fname_admin:fname_admin_input ,
        lname_admin: lname_admin_input,
        identitynum_admin: identity_admin_input,
        address_admin: address_admin_input,
        bday_admin: bday_admin_input,
        id_admin: id_admin_input,
        tel_admin: tel_admin_input,
        email_admin:email_admin_input ,
        other_admin: other_admin_input,
      };
  
      callAddAdmin(apiUrl + "admin_info" ,"update", admin_infos).then((data)=>{
        if(data.data > 0){
          alert(data.message);
          window.location = '/adminpage/admin.html'
          fname_admin_input.value =""
          lname_admin_input.value=""
          identity_admin_input.value=""
          address_admin_input.value=""
          bday_admin_input.value=""
          id_admin_input.value=""
          tel_admin_input.value=""
          email_admin_input.value=""
          other_admin_input.value=""
        }
        else{
          alert("Please provide information")
        }
      })
    })
  }

if(add_admin_submit){
  add_admin_submit.addEventListener("click",()=>{
    console.log(fname_admin_input.value)
    fname_admin_input = fname_admin_input.value
    lname_admin_input = lname_admin_input.value
    identity_admin_input = identity_admin_input.value
    address_admin_input = address_admin_input.value
    bday_admin_input = bday_admin_input.value
    id_admin_input = id_admin_input.value
    tel_admin_input = tel_admin_input.value
    email_admin_input = email_admin_input.value
    other_admin_input = other_admin_input.value

    let admin_infos = {
      fname_admin:fname_admin_input ,
      lname_admin: lname_admin_input,
      identitynum_admin: identity_admin_input,
      address_admin: address_admin_input,
      bday_admin: bday_admin_input,
      id_admin: id_admin_input,
      tel_admin: tel_admin_input,
      email_admin:email_admin_input ,
      other_admin: other_admin_input,
    };

    callAddAdmin(apiUrl + "admin_info" ,"insert", admin_infos).then((data)=>{
      if(data.data > 0){
        alert(data.message);
        window.location = '/adminpage/admin.html'
        fname_admin_input.value =""
        lname_admin_input.value=""
        identity_admin_input.value=""
        address_admin_input.value=""
        bday_admin_input.value=""
        id_admin_input.value=""
        tel_admin_input.value=""
        email_admin_input.value=""
        other_admin_input.value=""
      }
      else{
        alert("Please provide information")
      }
    })
  })
}
// ค้นหา admin ตาม id
if (search_admin_submit) {
  search_admin_submit.addEventListener("click", () => {
    search_admin = search_admin.value;

    callAdmin(apiUrl + "admin_info/" + search_admin, "select").then((data) => {
      if (data.data) {
        alert(data.message);

        let output = `
          <div style="border: 1px solid black; border-radius: 10px; align-items: center; padding: 10px; margin: 10px;">
            <h2>ID Admin : ${data.data.id_admin}</h2>
            <p>Firstname : ${data.data.fname_admin}</p>
            <p>Lastname : ${data.data.lname_admin}</p>
            <p>Phone number : ${data.data.tel_admin}</p>
            <p>Birth date : ${data.data.bday_admin}</p>
            <p>Identification No : ${data.data.identitynum_admin}</p>
            <p>Address : ${data.data.address_admin}</p>
            <p>Email : ${data.data.email_admin}</p>
            <p>Other : ${data.data.other_admin}</p>
          </div>
        `;

        document.getElementById("footer_section").innerHTML = output;
      }
    });
  });
}
// admin ทั้งหมด
function generateHTML(data) {
  const admin_info = data.data.map(item => `
      <div style="border: 1px solid black; border-radius: 10px; align-items: center; padding: 10px; margin: 10px; float: left; width: 60%;">
          <h2>ID: ${item.id_admin}</h2>
          <p>First name : ${item.fname_admin}</p>
          <p>Last name : ${item.lname_admin}</p>
          <p>Identitynumber : ${item.identitynum_admin}</p>
          <p>Address : ${item.address_admin}</p>
          <p>Tel. : ${item.tel_admin}</p>
      </div>
  `).join('');

  return admin_info;
}

if(select_all_admin){
  select_all_admin.addEventListener("click", () => {
  callAdmin(apiUrl + "admin_info", "selectall").then((data) => {
      if (data.data.length > 0) {
          const adminContainer = generateHTML(data);
          const footerSection = document.querySelector('.footer_section');
          footerSection.innerHTML = adminContainer;
      }
  });
});
}

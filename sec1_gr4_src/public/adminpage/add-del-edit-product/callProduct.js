let apiUrl = "http://localhost:8028/";

console.log(apiUrl)

// ดึงtag ที่อยู่ในตาราง
let serach_product = document.querySelector(".search_edit_prod");
/* page add-product*/ 
let code_pro = document.querySelector("#code-product");
let name_pro = document.querySelector("#name-product");
let picture_pro = document.querySelector("#picture-product");
let brand_pro = document.querySelector("#brand-product");
let series_pro = document.querySelector("#series-product");
let suppier_pro = document.querySelector("#suppier-product");
let detail_pro = document.querySelector("#detail-product");
let price_pro = document.querySelector("#price-product");
// ปุ่ม
let add_product = document.querySelector("#add-product-save");

/* page delete-product*/
let delete_search = document.querySelector("#delete-search");
// ปุ่ม
let delete_search_product = document.querySelector("#find_del-product-button");
// let delete_product_button = document.querySelector("#delete_product_button");


/* edit delete-product*/
let edit_search = document.querySelector("#edit-search");
// ปุ่ม
let edit_product = document.querySelector("#edit-serch-submit");
let edit_save_product = document.querySelector("#edit-product-save");




async function callProduct(url, method, sentData = {}) {
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
  } else if (method == "insert" || method == "update" || method == "delete") {
    let aMethod;
    if (method == "insert") {
      aMethod = "POST";
    } else if (method == "update") {
      aMethod = "PUT";
    } else if (method == "delete") {
      aMethod = "DELETE";
    }
    let response = await fetch(url, {
      method: aMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentData),
    });
    data = await response.json();
    console.log(data)
    console.log(method)
  }

  return data;
}

function clearInput() {
  code_pro.value = "";
  name_pro.value = "";
  picture_pro.value = "";
  brand_pro.value = "";
  series_pro.value = "";
  suppier_pro.value = "";
  detail_pro.value = "";
  price_pro.value = "";
}
let code_product, name_product, picture_product, brand_product, series_product, suppier_product, detail_product, price_product;

// add product
if (add_product) {
  add_product.addEventListener("click", () => {
    console.log("Pass")
    code_product = code_pro.value;
    name_product = name_pro.value;
    picture_product = picture_pro.value;
    brand_product = brand_pro.value;
    series_product = series_pro.value;
    console.log(series_product)
    suppier_product = suppier_pro.value;
    detail_product = detail_pro.value;
    price_product = price_pro.value;
    console.log("Add");

    // แปลง url ที่คัดลอกจาก google drive
    let urlGoogle_drive_Picture = picture_product;
    let idProduct = urlGoogle_drive_Picture.match(/\/d\/(.+?)\//)[1];
    let urlPicture = `https://drive.google.com/uc?export=view&id=${idProduct}`;

    let product_data = {
      id_product: code_product,
      name_product: name_product,
      pic_product: urlPicture,
      brand_product: brand_product,
      series_product: series_product,
      manufacturer_product: suppier_product,
      detail_product: detail_product,
      price_product: price_product,
    }
    callProduct(apiUrl + "product_info", "insert", product_data).then((data) => {
      console.log(data)
      if (data.data > 0) {
        alert(data.message);
        clearInput();
      }else{
        alert("Please provide information")
      }
    });
  });
}

if(delete_search_product) {
  delete_search_product.addEventListener("click", () =>{
  id_pro = delete_search.value;
  let product_data = {
    id_product: id_pro,};
  console.log(product_data)
  callProduct(apiUrl+ "product_info/"+ id_pro, "select").then((data)=>{
    
    console.log(data)
    console.log(data.id_product)
    if(data.data){
      alert(data.data.id_product);
      code_pro = data.data.id_product;
      console.log(code_pro)
      name_pro = data.data.name_product;
      brand_pro = data.data.brand_product;
      series_pro = data.data.series_product;
      manufacturer_pro = data.data.manufacturer_product;
      console.log(name_pro+"name")
      let output;
      output = "<h1>รายการ</h1>&nbsp;<br>";
      output += "<p> ";
      output += "</p> ";
      output += " ";
      output += "<table class='spaced-table'>";
      output += "<table '>";
      output += "<thead>";
      output += "<tr>";
      output +="<th scope='col'>รหัสสินค้า</th><th scope='col'>ชื่อสินค้า</th><th scope='col'>แบรนด์</th><th scope='col'>ยี่ห้อ</th><th scope='col'>ซี่รีย์</th>";
      output += "</tr> ";
      output += "</thead>";
      output += "<tbody>"
  
        output += "<tr>";
        output += "<td>" + code_pro + "</td>";
        output += "<td>" + name_pro + "</td>";
        output += "<td>" + brand_pro + "</td>";
        output += "<td>" + series_pro  + "</td>";
        output += "<td>" + manufacturer_pro + "</td>";

        output += "</tr>";
      output += "</tbody>";
      output += "</table>";
      $("#edit-prod-table").html(output);
          console.log("deleteee")
          callProduct(apiUrl+ "product_info", "delete",product_data).then((data)=> {
            console.log(data);
          if (data.data > 0) {
            alert("delete success");
          }
        })
    }else{
      alert(id_pro + " is not define");
    }
  })
}
)}

if (edit_save_product) {
  edit_save_product.addEventListener("click", () => {
    console.log("Pass")
    code_product = code_pro.value;
    name_product = name_pro.value;
    picture_product = picture_pro.value;
    brand_product = brand_pro.value;
    series_product = series_pro.value;
    suppier_product = suppier_pro.value;
    detail_product = detail_pro.value;
    price_product = price_pro.value;
    console.log("Add product");
    let urlGoogle_drive_Picture = picture_product;
    let idProduct = urlGoogle_drive_Picture.match(/\/d\/(.+?)\//)[1];
    let urlPicture = `https://drive.google.com/uc?export=view&id=${idProduct}`;

    let product_data = {
      id_product: code_product,
      name_product: name_product,
      pic_product: urlPicture,
      brand_product: brand_product,
      series_product: series_product,
      manufacturer_product: suppier_product,
      detail_product: detail_product,
      price_product: price_product,
    }
    callProduct(apiUrl + "product_info", "update", product_data).then((data) => {
      console.log(data)
      if (data.data > 0) {
        alert(data.message);
        console.log(code_pro)
        code_pro.value = "";
        name_pro.value = "";
        brand_pro.value = "";
        series_pro.value = "";
        suppier_pro.value = "";
        detail_pro.value = "";
        price_pro.value = "";
        window.location.href  = '/adminpage/add-del-edit-product/edit-product.html#';
      }
    });
  });
}

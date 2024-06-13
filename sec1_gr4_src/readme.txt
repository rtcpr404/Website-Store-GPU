

เมื่อเปิดไฟล์ sec1_gr4_ws_src และ sec1_gr4_src ให้ทำการติดตั้ง npm init และติดตั้ง module axios cors dotenv express jsonwebtoken mysql2 node-fetch ใน folder sec1_gr4_src

และในไฟล์ sec1_gr4_ws_src ต้องทำการติดตั้ง module axios cors dotenv express jsonwebtoken mysql2 node-fetch nodemon

และใช้ npm start ทั้ง 2 ไฟล์

จากนั้นเข้า http://localhost:8027/home ซึ่งจะมีหน้า log in และดูสินค้าทั้งหมดจากด้านล่าง และสามารถค้นหาสินค้าได้จากการกดเข้า Product บนแถบ Navigation Bar 

และถ้าเข้า http://localhost:8027/admin จะสามารถเข้าในหน้าที่ผู้ดูแลระบบสามารถจัดการเกี่ยวกับเว็บได้ ซึ่งเมื่อเลือก information addmin จะสามารถ เพิ่ม ลบ อัพเดท ข้อมูล admin ได้ 

ซึ่งในแต่ละหน้า ถ้าหากต้องการใส่ข้อมูลตัวใหม่เข้าไป ให้ทำการ refesh ใหม่ก่อนทุกครั้ง
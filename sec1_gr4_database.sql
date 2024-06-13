DROP DATABASE IF EXISTS team14; 
CREATE DATABASE IF NOT EXISTS team14 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE team14;
 

CREATE TABLE `admin_info` (
  `fname_admin` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lname_admin` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `identitynum_admin` bigint(13)  NOT NULL unique,
  `address_admin` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `bday_admin` date  not NULL,
  `id_admin` varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci not NULL unique primary key,
  `tel_admin` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci default null,
  `email_admin`  varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci default null,
  `other_admin` text null
) ;

INSERT INTO `admin_info` (`fname_admin`, `lname_admin`, `identitynum_admin`, `address_admin`, `bday_admin`,`id_admin`,`tel_admin`,`email_admin`,`other_admin`) VALUES
('Rittichon', 'Phonrad', 1003453870642,'นครปฐม วัดไร่ขิง 21032' , '2000-07-27','A00002','0932243298','ritti@gmail.com',null),
('Jirachaya', 'Rachpolsaen', 1100869570634,'มหิดลศาลายา ประตู4 11001' , '2000-11-05','A00001','0234567890','jirach@gmail.com','workhard play harder'),
('Nuttapong', 'Luangpiboon', 1300874308710,'วัดสังฆ์กระจุย กรุงเทพ 10700' , '1996-06-08','A00004','0875422580','nutta@gmail.com',null),
('Supitchaya', 'Aneksupapon', 1330575450692,'หนองบัวลำภู 54690' , '1997-04-15','A00003','0933434120','supit@gmail.com',null);


-- table product
CREATE TABLE `product_sistem` (
  `id_product` varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL unique primary key,
  `name_product` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pic_product` longtext ,
  `brand_product` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci not NULL,
  `series_product` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci not NULL,
  `manufacturer_product` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci not NULL,
  `detail_product` text  default null,
  `price_product`  int(6)  not null 
) ;

INSERT INTO `product_sistem` (`id_product`, `name_product`, `pic_product`, `brand_product`, `series_product`,`manufacturer_product`,`detail_product`,`price_product`) VALUES
('P00001', 'ASUS ROG STRIX GEFORCE RTX 4090 O24G GAMING', 'https://drive.google.com/uc?export=view&id=1eYgvVGgoPTBDNSYMSsnJRPSaQFtvVokE' , 'ASUS','RTX4090','NVIDIA','Graphic Engine : NVIDIA® GeForce RTX™ 4090
Base Clock : 2610 MHz
Boost Clock : 2640 MHz
CUDA Core : 16384 Units
Warranty : 3Years',79900),
('P00002', 'ASUS TUF GAMING GEFORCE RTX 4090 O24G',  'https://drive.google.com/uc?export=view&id=1J6KU5t-N8g0IocO_yQVYyWwBJn7CoyJQ' , 'ASUS' ,'RTX4090','NVIDIA','Graphic Engine : NVIDIA® GeForce RTX™ 4090
Base Clock : 2235 MHz
Boost Clock : 2595 MHz
CUDA Core : 16384 Units
Warranty : 3Years','74900'),
('P00003', 'MSI GEFORCE RTX 4090 GAMING X TRIO 24G', 'https://drive.google.com/uc?export=view&id=1K2MGo8uBzjqwo1sTBIOVMqJX8JQZV3CU','MSI' , 'RTX4090','NVIDIA','Graphic Engine : NVIDIA® GeForce RTX™ 4090
Base Clock : 2235 MHz
Boost Clock : 2595 MHz
CUDA Core : 16384 Units
Warranty : 3Years',67990),
('P00004', 'GIGABYTE RADEON RX 7900 XTX GAMING OC 24GB', 'https://drive.google.com/uc?export=view&id=1vNhuESuVQ7i1dny7THD0gpvglCwnJoGE','GIGABYTE' , 'RX7900','AMD','Graphic Engine : AMD RADEON® RX 7900 XTX
Base Clock : 2330 MHz
Boost Clock : 2525 MHz
CUDA Core : 6144 Units
Warranty : 3Years',40490),
('P00005', 'POWER COLOR HELLHOUND RADEON RX 7800 XT 16GB','https://drive.google.com/uc?export=view&id=1B9_vV8jph9xnJh2uovH5-Qh_H2IZCN-T','POWERCOLOR' , 'RX7800','AMD','Graphic Engine : AMD RADEON® RX 7800 XT
Base Clock : 2213 MHz
Boost Clock : 2520 MHz
CUDA Core : 3840 Units
Warranty : 3Years',19900),
('P00006', 'XFX SPEEDSTER SWFT210 RADEON RX 7600 8GB', 'https://drive.google.com/uc?export=view&id=18AjRkxvbaUh2jQVQfibWZ5KdApbmmgHR','XFX' , 'RX7600','AMD','Graphic Engine : AMD RADEON® RX 7600
Base Clock : 1720 MHz
Boost Clock : 2655 MHz
CUDA Core : 2048 Units
Warranty : 3Years', 10290);


create table `login_sistem` (
  `username_sistem` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL unique primary key,
  `password_sistem` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ;
INSERT INTO `login_sistem` (`username_sistem`, `password_sistem`) VALUES
('A000003','supich1234'),
('pinky','12345');



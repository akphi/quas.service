USE quas_mysql_db;
#SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS user;
#SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE user(
id integer(10) auto_increment,
username varchar(100),
password varchar(100),
primary key (id)
);
CREATE USER 'quas_admin'@'localhost' IDENTIFIED BY 'quas_password';
GRANT ALL ON quas_mysql_db.* TO 'quas_admin'@'localhost';

CREATE USER 'quas_user'@'localhost' IDENTIFIED BY 'quas_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON quas_mysql_db.* TO 'quas_user'@'localhost';

CREATE USER 'quas_public'@'localhost' IDENTIFIED BY 'quas_password';
GRANT SELECT ON quas_mysql_db.* TO 'quas_public'@'localhost';
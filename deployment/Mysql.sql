CREATE database quas_mysql_db;
use quas_mysql_db;


CREATE USER 'quas_admin' IDENTIFIED BY 'quas_password';
GRANT ALL ON quas_mysql_db.* TO 'quas_admin';

CREATE USER 'quas_user' IDENTIFIED BY 'quas_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON quas_mysql_db.* TO 'quas_user';

CREATE USER 'quas_public' IDENTIFIED BY 'quas_password';
GRANT SELECT ON quas_mysql_db.* TO 'quas_user';
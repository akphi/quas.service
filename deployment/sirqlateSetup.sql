CREATE database sirqlate;
use sirqlate;


CREATE USER 'sirqlate_admin' IDENTIFIED BY 'password';
GRANT ALL ON sirqlate.* TO 'sirqlate_admin';

CREATE USER 'sirqlate_game' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON sirqlate.* TO 'sirqlate_game'; 

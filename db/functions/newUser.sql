DROP FUNCTION IF EXISTS newUser;
DELIMITER //
CREATE FUNCTION newUser (_user VARCHAR(15), _email VARCHAR(100), _pass VARCHAR(60))
RETURNS VARCHAR (55)

DETERMINISTIC
BEGIN
	DECLARE aux_user VARCHAR(15);
    DECLARE aux_email VARCHAR(60);
    
    SET aux_user  = (SELECT u.username FROM users as u WHERE u.username = _user);
    SET aux_email = (SELECT u.email FROM users as u WHERE u.email = _email);
    
    IF (aux_user = _user OR aux_email = _email) THEN
		RETURN 'Error: User or email already exists';
	ELSEIF (_user = '' OR _email = '' OR _pass = '') THEN
		RETURN 'Error: You have empty inputs' ;
	ELSE
		 INSERT INTO users (username, email, password) VALUES (_user, _email, _pass);
         RETURN 'Success';
	END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
-- INSERT INTO users (username, email, password) VALUES ('root', 'root@root.com', 'root');
-- SELECT * FROM users;
	-- SELECT newUser('pm', 'pm@root.com', 'root');
-- SET FOREIGN_KEY_CHECKS=0;
-- TRUNCATE TABLE users;
-- SET FOREIGN_KEY_CHECKS=1;
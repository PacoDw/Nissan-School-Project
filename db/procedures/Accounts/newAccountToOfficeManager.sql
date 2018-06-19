DROP PROCEDURE IF EXISTS newAccountToOfficeManager;
DELIMITER //
CREATE PROCEDURE newAccountToOfficeManager (
	_account      VARCHAR(55),
	_email        VARCHAR(100), 
	_pass	      VARCHAR(60), 
	_typeAccount  VARCHAR(60),
	_id_office_manager    INTEGER
	)

DETERMINISTIC
BEGIN
	DECLARE aux_account VARCHAR(15);
    DECLARE aux_email VARCHAR(60);
    DECLARE aux_id_office_manager INTEGER;
	DECLARE aux_id_account INTEGER; 

    SET aux_account   = (SELECT u.username FROM accounts as u WHERE u.username = _account ORDER BY u.id_account LIMIT 1);
    SET aux_email     = (SELECT u.email FROM accounts as u WHERE u.email = _email ORDER BY u.id_account LIMIT 1);
    SET aux_id_office_manager = (SELECT s.id_office_manager FROM office_managers as s WHERE s.id_office_manager = _id_office_manager ORDER BY id_office_manager LIMIT 1);

	IF (aux_id_office_manager = _id_office_manager) THEN
		IF (aux_account = _account OR aux_email = _email) THEN
			SELECT 'Error: Account or email already exists' as error;
		ELSE IF (_account = '' OR _email = '' OR _pass = '') THEN
			SELECT 'Error: You have empty inputs' as error;
		ELSE
			INSERT INTO accounts (username, email, password, typeAccount) VALUES (_account, _email, _pass, _typeAccount);
			SET aux_id_account = (SELECT u.id_account FROM accounts as u WHERE u.username = _account AND u.email = _email LIMIT 1);

			UPDATE office_managers as s SET s.id_account = aux_id_account WHERE s.id_office_manager = _id_office_manager;
			
			SELECT 'Success: The Account have been save' as success;
		END IF;
	END IF;
	ELSE
		SELECT 'Error: The reference office managers is not exists, please select a office managers' as error;
	END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
-- INSERT INTO accounts (username, email, password, typeAccount) VALUES ('invited', 'invited@nissan.mx', '', 'invited');
-- SELECT * FROM accounts;
-- SELECT * FROM office_managers;
-- SELECT a.id_account, a.email,  a.username, a.typeAccount FROM accounts as a;

-- call newAccountToOfficeManager('invited', 'invited@nissan.mx', '0', 'invited', 1);
-- call newAccountToOfficeManager('carlos', 'carlos@nissan.mx', '0', 'invited', 3);

-- CALL newAccountToOfficeManager('username', 'email@ds', 'password', 'typeAccount', 'id_office_manager');
-- SET FOREIGN_KEY_CHECKS=0;
-- TRUNCATE TABLE accounts;
-- SET FOREIGN_KEY_CHECKS=1;

-- select s.id_office_manager, s.id_account, s.name, a.id_account from office_managers as s
-- INNER JOIN accounts as a ON s.id_account = a.id_account;
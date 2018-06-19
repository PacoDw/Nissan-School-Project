DROP PROCEDURE IF EXISTS newAccountToGlobalManager;
DELIMITER //
CREATE PROCEDURE newAccountToGlobalManager (
	_account      VARCHAR(55),
	_email        VARCHAR(100), 
	_pass	      VARCHAR(60), 
	_typeAccount  VARCHAR(60),
	_id_global_manager    INTEGER
	)

DETERMINISTIC
BEGIN
	DECLARE aux_account VARCHAR(15);
    DECLARE aux_email VARCHAR(60);
    DECLARE aux_id_global_manager INTEGER;
	DECLARE aux_id_account INTEGER; 

    SET aux_account   = (SELECT u.username FROM accounts as u WHERE u.username = _account ORDER BY u.id_account LIMIT 1);
    SET aux_email     = (SELECT u.email FROM accounts as u WHERE u.email = _email ORDER BY u.id_account LIMIT 1);
    SET aux_id_global_manager = (SELECT s.id_global_manager FROM global_managers as s WHERE s.id_global_manager = _id_global_manager ORDER BY id_global_manager LIMIT 1);

	IF (aux_id_global_manager = _id_global_manager) THEN
		IF (aux_account = _account OR aux_email = _email) THEN
			SELECT 'Error: Account or email already exists' as error;
		ELSE IF (_account = '' OR _email = '' OR _pass = '') THEN
			SELECT 'Error: You have empty inputs' as error;
		ELSE
			INSERT INTO accounts (username, email, password, typeAccount) VALUES (_account, _email, _pass, _typeAccount);
			SET aux_id_account = (SELECT u.id_account FROM accounts as u WHERE u.username = _account AND u.email = _email LIMIT 1);

			UPDATE global_managers as s SET s.id_account = aux_id_account WHERE s.id_global_manager = _id_global_manager;
			
			SELECT 'Success: The Account have been save' as success;
		END IF;
	END IF;
	ELSE
		SELECT 'Error: The reference global manager is not exists, please select a global manager' as error;
	END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
-- INSERT INTO accounts (username, email, password, typeAccount) VALUES ('invited', 'invited@nissan.mx', '', 'invited');
-- SELECT * FROM accounts;
-- SELECT * FROM global_managers;
-- SELECT a.id_account, a.email,  a.username, a.typeAccount FROM accounts as a;

-- call newAccountToGlobalManager('invited', 'invited@nissan.mx', '0', 'invited', 1);
-- call newAccountToGlobalManager('carlos', 'carlos@nissan.mx', '0', 'invited', 3);

-- CALL newAccountToGlobalManager('username', 'email@ds', 'password', 'typeAccount', 'id_global_manager');
-- SET FOREIGN_KEY_CHECKS=0;
-- TRUNCATE TABLE accounts;
-- SET FOREIGN_KEY_CHECKS=1;

-- select s.id_global_manager, s.id_account, s.name, a.id_account from global_managers as s
-- INNER JOIN accounts as a ON s.id_account = a.id_account;
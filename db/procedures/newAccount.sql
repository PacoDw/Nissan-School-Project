DROP PROCEDURE IF EXISTS newAccount;
DELIMITER //
CREATE PROCEDURE newAccount (
	_account      VARCHAR(15),
	_email     VARCHAR(100), 
	_pass	   VARCHAR(60), 
	_typeAccount  VARCHAR(60)
	)

DETERMINISTIC
BEGIN
	DECLARE aux_account VARCHAR(15);
    DECLARE aux_email VARCHAR(60);
    
    SET aux_account  = (SELECT u.username FROM accounts as u WHERE u.username = _account ORDER BY u.id_account LIMIT 1);
    SET aux_email = (SELECT u.email FROM accounts as u WHERE u.email = _email ORDER BY u.id_account LIMIT 1);
    
    IF (aux_account = _account OR aux_email = _email) THEN
		SELECT 'Error: Account or email already exists' as error;
	ELSE IF (_account = '' OR _email = '' OR _pass = '') THEN
		SELECT 'Error: You have empty inputs' as error;
	ELSE
		INSERT INTO accounts (username, email, password) VALUES (_account, _email, _pass, _typeAccount);
		SELECT 'Success: The Account have been save' as success;
	END IF;
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
INSERT INTO accounts (username, email, password, typeAccount) VALUES ('invited', 'invited@nissan.mx', '', 'invited');
SELECT * FROM accounts;
CALL newAccount('eq', '', 'dsas', 'other');
SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE accounts;
SET FOREIGN_KEY_CHECKS=1;
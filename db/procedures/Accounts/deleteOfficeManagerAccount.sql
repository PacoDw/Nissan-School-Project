DROP PROCEDURE IF EXISTS deleteOfficeManagerAccount;
DELIMITER //
CREATE PROCEDURE deleteOfficeManagerAccount (
    _id_account   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_id_office_manager INTEGER;
    DECLARE aux_id_account INTEGER;

    SET aux_search = (SELECT a.id_account FROM accounts as a WHERE a.id_account = _id_account LIMIT 1);
    SET aux_id_office_manager  = (SELECT s.id_office_manager FROM office_managers as s WHERE s.id_account = aux_search LIMIT 1);
    SET aux_id_account = (SELECT s.id_account FROM office_managers as s WHERE s.id_office_manager = aux_id_office_manager LIMIT 1);

    IF (aux_search = _id_account) THEN
		SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM accounts WHERE accounts.id_account = _id_account;
		UPDATE office_managers as s SET s.id_account = 1 WHERE s.id_office_manager = aux_id_office_manager;
        SET FOREIGN_KEY_CHECKS=1;
        SELECT 'Success: The account has been deleted' as success;
	ELSE 
	   SELECT 'Error: This account is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
-- INSERT INTO accounts (username, email, password, typeAccount) VALUES ('invited', 'invited@nissan.mx', '', 'invited');
-- SELECT * FROM accounts;
-- SELECT * FROM office_managers;

-- SET FOREIGN_KEY_CHECKS=0;
-- CALL deleteOfficeManagerAccount(3);
-- truncate table accounts;
-- SET FOREIGN_KEY_CHECKS=1;
-- select * from accounts;

-- DELETE FROM accounts WHERE accounts.id_account = 2;
-- use nissan_db;
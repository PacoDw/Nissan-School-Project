DROP PROCEDURE IF EXISTS deleteOfficeManager;
DELIMITER //
CREATE PROCEDURE deleteOfficeManager (
    _id_office_manager   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_account INTEGER;
    DECLARE aux_office_manager_id_account INTEGER;
    
    SET aux_search  = (SELECT s.id_office_manager FROM office_managers as s WHERE s.id_office_manager = _id_office_manager LIMIT 1);
	SET aux_office_manager_id_account = (SELECT s.id_account FROM office_managers as s WHERE s.id_office_manager = _id_office_manager);
    SET aux_account = (SELECT s.id_account FROM office_managers as s WHERE s.id_account = aux_office_manager_id_account LIMIT 1);


    IF (aux_search = _id_office_manager) THEN
		IF (aux_account = '1') THEN
			DELETE FROM office_managers WHERE office_managers.id_office_manager = _id_office_manager;
			SELECT 'Warning: The office manager has not account' as success;
        ELSE IF (aux_account = aux_office_manager_id_account) THEN
			SET FOREIGN_KEY_CHECKS=0;
			DELETE FROM accounts WHERE accounts.id_account = aux_account;
			DELETE FROM office_managers WHERE office_managers.id_office_manager = _id_office_manager; 
            SET FOREIGN_KEY_CHECKS=1;
            SELECT 'Success: The office manager has been deleted' as success;
        END IF;
	END IF;
    ELSE 
	   SELECT 'Error: This office manager is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
-- SET FOREIGN_KEY_CHECKS=0;
-- CALL deleteOfficeManager(24);
-- truncate table office_managers;
-- SET FOREIGN_KEY_CHECKS=1;
-- select * from office_managers;
-- -- select * from accounts;
-- SELECT s.id_office_manager FROM office_managers as s WHERE s.id_office_manager = 24 LIMIT 1;

-- SELECT s.id_account FROM office_managers as s WHERE s.id_office_manager = 24;

-- SELECT s.id_account FROM office_managers as s  WHERE s.id_account = 9;

-- DELETE FROM office_managers WHERE office_managers.id_office_manager = 2;
-- use nissan_db;
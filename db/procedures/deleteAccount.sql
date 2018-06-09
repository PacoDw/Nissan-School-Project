DROP PROCEDURE IF EXISTS deleteAccount;
DELIMITER //
CREATE PROCEDURE deleteAccount (
    _id_account   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_id_seller INTEGER;
    DECLARE aux_id_account INTEGER;

    SET aux_search = (SELECT a.id_account FROM accounts as a WHERE a.id_account = _id_account LIMIT 1);
    SET aux_id_seller  = (SELECT s.id_seller FROM sellers as s WHERE s.id_account = aux_search LIMIT 1);
    SET aux_id_account = (SELECT s.id_account FROM sellers as s WHERE s.id_seller = aux_id_seller LIMIT 1);

    IF (aux_search = _id_account) THEN
		SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM accounts WHERE accounts.id_account = _id_account;
		UPDATE sellers as s SET s.id_account = 1 WHERE s.id_seller = aux_id_seller;
        SET FOREIGN_KEY_CHECKS=1;
        SELECT 'Success: The account has been deleted' as success;
	ELSE 
	   SELECT 'Error: This account is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
INSERT INTO accounts (username, email, password, typeAccount) VALUES ('invited', 'invited@nissan.mx', '', 'invited');
SELECT * FROM accounts;
SELECT * FROM sellers;

SET FOREIGN_KEY_CHECKS=0;
CALL deleteAccount(3);
truncate table accounts;
SET FOREIGN_KEY_CHECKS=1;
select * from accounts;

DELETE FROM accounts WHERE accounts.id_account = 2;
use nissan_db;
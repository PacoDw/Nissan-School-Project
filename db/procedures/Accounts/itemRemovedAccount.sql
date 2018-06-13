DROP PROCEDURE IF EXISTS itemRemovedAccount;
DELIMITER //
CREATE PROCEDURE itemRemovedAccount (
    _id   INTEGER,
    _typeAccount VARCHAR(30)
)

DETERMINISTIC
BEGIN
    IF (STRCMP(_typeAccount, 'Seller') = 0 ) THEN
        SELECT s.id_seller, s.name, s.job FROM sellers as s WHERE s.id_account = _id LIMIT 1;
    ELSEIF (STRCMP(_typeAccount,'Office Manager') = 0) THEN
        SELECT s.id_officeManager, s.name, s.job FROM officeManager as s WHERE s.id_account = _id LIMIT 1;
    ELSEIF (STRCMP(_typeAccount, 'Global Manager') = 0) THEN
        SELECT s.id_globalManager, s.name, s.job FROM gloabalManager as s WHERE s.id_account = _id LIMIT 1;
	ELSE 
		SELECT 'empty';
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
-- SET FOREIGN_KEY_CHECKS=0;
CALL itemRemovedAccount(4, 'seller');
-- truncate table sellers;
-- SET FOREIGN_KEY_CHECKS=1;
select * from sellers;
select * from accounts;

SELECT s.id_seller, s.name, s.job FROM sellers as s WHERE s.id_account = 8;
-- SELECT s.id_seller FROM sellers as s WHERE s.id_seller = 24 LIMIT 1;

-- SELECT s.id_account FROM sellers as s WHERE s.id_seller = 24;

-- SELECT s.id_account FROM sellers as s  WHERE s.id_account = 9;

-- DELETE FROM sellers WHERE sellers.id_seller = 2;
use nissan_db;
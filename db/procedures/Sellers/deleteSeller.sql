DROP PROCEDURE IF EXISTS deleteSeller;
DELIMITER //
CREATE PROCEDURE deleteSeller (
    _id_seller   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_account INTEGER;
    DECLARE aux_seller_id_account INTEGER;
    
    SET aux_search  = (SELECT s.id_seller FROM sellers as s WHERE s.id_seller = _id_seller LIMIT 1);
	SET aux_seller_id_account = (SELECT s.id_account FROM sellers as s WHERE s.id_seller = _id_seller);
    SET aux_account = (SELECT s.id_account FROM sellers as s WHERE s.id_account = aux_seller_id_account LIMIT 1);


    IF (aux_search = _id_seller) THEN
		IF (aux_account = '1') THEN
			DELETE FROM sellers WHERE sellers.id_seller = _id_seller;
			SELECT 'Warning: The seller has not account' as success;
        ELSE IF (aux_account = aux_seller_id_account) THEN
			SET FOREIGN_KEY_CHECKS=0;
			DELETE FROM accounts WHERE accounts.id_account = aux_account;
			DELETE FROM sellers WHERE sellers.id_seller = _id_seller; 
            SET FOREIGN_KEY_CHECKS=1;
            SELECT 'Success: The seller has been deleted' as success;
        END IF;
	END IF;
    ELSE 
	   SELECT 'Error: This seller is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
-- SET FOREIGN_KEY_CHECKS=0;
-- CALL deleteSeller(24);
-- truncate table sellers;
-- SET FOREIGN_KEY_CHECKS=1;
-- select * from sellers;
-- -- select * from accounts;
-- SELECT s.id_seller FROM sellers as s WHERE s.id_seller = 24 LIMIT 1;

-- SELECT s.id_account FROM sellers as s WHERE s.id_seller = 24;

-- SELECT s.id_account FROM sellers as s  WHERE s.id_account = 9;

-- DELETE FROM sellers WHERE sellers.id_seller = 2;
-- use nissan_db;
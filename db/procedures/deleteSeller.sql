DROP PROCEDURE IF EXISTS deleteSeller;
DELIMITER //
CREATE PROCEDURE deleteSeller (
    _id_seller   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search VARCHAR(50);

    SET aux_search = (SELECT s.id_seller FROM sellers as s WHERE s.id_seller = _id_seller LIMIT 1);
    
    IF (aux_search = _id_seller) THEN
		SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM sellers WHERE sellers.id_seller = _id_seller;
        SET FOREIGN_KEY_CHECKS=1;

        SELECT 'Success: The seller has been deleted' as success;
	ELSE 
	   SELECT 'Error: This seller is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS=0;
CALL deleteSeller(2);
SET FOREIGN_KEY_CHECKS=1;
select * from sellers;

DELETE FROM sellers WHERE sellers.id_seller = 2;
use nissan_db;
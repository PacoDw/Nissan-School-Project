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
        SELECT s.id_office_manager, s.name, s.job FROM office_managers as s WHERE s.id_account = _id LIMIT 1;
    ELSEIF (STRCMP(_typeAccount, 'Global Manager') = 0) THEN
        SELECT s.id_global_manager, s.name, s.job FROM global_managers as s WHERE s.id_account = _id LIMIT 1;
	ELSE 
		SELECT 'empty';
    END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------

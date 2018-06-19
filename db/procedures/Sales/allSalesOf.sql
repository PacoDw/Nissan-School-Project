DROP PROCEDURE IF EXISTS allSalesOf;
DELIMITER //
CREATE PROCEDURE allSalesOf (_id_seller INTEGER)

DETERMINISTIC
BEGIN
    SELECT s.id_sale, car.name as car_name, cus.name as customer_name,  st.status_sale, s.deposit, cm.cost
    FROM sales as s
    INNER JOIN cars as car ON car.id_car = s.id_car
    INNER JOIN cars_models as cm ON cm.id_car_model = car.id_car_model
    INNER JOIN customers as cus ON cus.id_customer = s.id_customer
    INNER JOIN status_sales as st ON st.id_status_sale = s.id_status_sale
    WHERE s.id_seller = _id_seller;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------

-- SELECT * FROM sales;
-- CALL allSalesOf(2);

-- SET FOREIGN_KEY_CHECKS=0;
-- SET FOREIGN_KEY_CHECKS=1;

-- use nissan_db;
DROP PROCEDURE IF EXISTS allSales;
DELIMITER //
CREATE PROCEDURE allSales ()

DETERMINISTIC
BEGIN
    SELECT s.id_sale, car.name as car_name, cus.name as customer_name, sel.name as seller_name
    , st.status_sale, s.deposit
    FROM sales as s
    INNER JOIN cars as car ON car.id_car = s.id_car
    INNER JOIN customers as cus ON cus.id_customer = s.id_customer
    INNER JOIN status_sales as st ON st.id_status_sale = s.id_status_sale
    INNER JOIN sellers as sel ON sel.id_seller = s.id_seller;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------

-- SELECT * FROM sales;
-- CALL allSales();

-- SET FOREIGN_KEY_CHECKS=0;
-- SET FOREIGN_KEY_CHECKS=1;

-- use nissan_db;
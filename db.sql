CREATE TABLE `telus_exercise`.`subscriber` (
  `phoneNumber` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `domain` VARCHAR(150) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `features` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`phoneNumber`),
  UNIQUE INDEX `phoneNumber_UNIQUE` (`phoneNumber` ASC) VISIBLE);


INSERT INTO `telus_exercise`.`subscriber` (`phoneNumber`, `username`, `password`, `domain`, `status`, `features`) VALUES ('18675181010', '16045906403', 'p@ssw0rd!', 'ims.mnc660.mcc302.3gppnetwork.org', '1', '{\"callForwardNoReply\": {\"provisioned\": true,\"destination\": \"tel:+18675182800\"}}');
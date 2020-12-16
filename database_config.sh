CREATE USER 'event-tracker' IDENTIFIED BY 'event-tracker';
GRANT ALL PRIVILEGES ON *.* TO 'event-tracker'@'%';
CREATE DATABSE event_tracker;

ALTER USER 'event-tracker'@'%' IDENTIFIED WITH mysql_native_password BY 'event-tracker';
FLUSH PRIVILEGES;

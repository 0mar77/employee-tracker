-- Created Seeds for department, role and employee tables

INSERT INTO department (name)
VALUES ('Sales'),
       ('Customer Service'),
       ('Accounting'),
       ('Human Resources'),
       ('Marketing');

INSERT INTO role (title, salary, department_id)
 VALUES ('Sales Lead', 200000, 1),
        ('Salesperson', 100000, 1),
        ('CS Manager', 70000, 2),
        ('CS Representative', 50000, 2),
        ('Accountant Manager', 80000, 3),
        ('Accountant', 60000, 3),
        ('HR Manager', 90000, 4),
        ('HR Representative', 50000, 4),
        ('Marketing Manager', 90000, 5),
        ('Markerting Person', 70000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jerry', 'Smith', 1, 1),
       ('Luke', 'Skywalker', 2, 1),
       ('Darth', 'Vader', 3, 3),
       ('Morty', 'Smith', 4, 3),
       ('Rick', 'Sanchez', 5, 5),
       ('Summer', 'Smith', 6, 5),
       ('Beth', 'Smith', 7, 7),
       ('Bart', 'Simpson', 8, 7),
       ('Lisa', 'Simpson', 9, 9),
       ('Randy', 'Marsh', 10, 9);
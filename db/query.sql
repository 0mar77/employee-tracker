SELECT * FROM department
INNER JOIN role
ON role.department_id = department.id;

SELECT * FROM role
INNER JOIN employee
ON employee.role_id = role.id;

SELECT * FROM employee AS a
INNER JOIN employee AS b
ON a.manager_id = b.id;
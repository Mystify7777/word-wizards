-- assuming the table name is "todos", and columns "date" & "priority"
-- this will create a unique index between them
alter table todos
add constraint todos_date_priority_key
unique(date, priority)

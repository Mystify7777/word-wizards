-- assuming the table name is "todos", and a column "slug"
-- this will add a constraint so slugs do not have invalid characters
alter table todos
add constraint slug_format
check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

alter table warehouses add  column attendant_id int(11) COMMENT '管理员,员工id' AFTER attendant;
alter table warehouses add  constraint fk_attendant_staff foreign key(attendant_id) REFERENCES staffs(id);


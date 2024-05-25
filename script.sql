create table tb_lembrete(
	id int primary key auto_increment,
	texto varchar(1000) not null
);



insert into tb_lembrete(texto)
values ("Fazer café"), ("Tomar café");


select * from tb_lembrete;
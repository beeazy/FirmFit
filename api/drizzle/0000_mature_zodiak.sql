CREATE TABLE "classes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "classes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"capacity" integer,
	"trainer_id" integer NOT NULL,
	"duration_minutes" integer NOT NULL,
	"price" double precision NOT NULL,
	"schedule" jsonb NOT NULL
);

CREATE TABLE "gyms" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gyms_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"address" text,
	"phone" varchar(20),
	"email" varchar(255),
	"active" integer DEFAULT 1 NOT NULL,
	"membership_fee" integer NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL
);

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 CREATE TABLE IF NOT EXISTS "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"desc" varchar NOT NULL,
	"icon" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"role" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "site_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "home_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"cta_title" varchar NOT NULL,
	"cta_link" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "home_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"services_id" integer
);

CREATE TABLE IF NOT EXISTS "services_page" (
	"id" serial PRIMARY KEY NOT NULL,
	"subtitle" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "services_page_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"services_id" integer
);

CREATE INDEX IF NOT EXISTS "services_created_at_idx" ON "services" ("created_at");
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "home_page_rels_order_idx" ON "home_page_rels" ("order");
CREATE INDEX IF NOT EXISTS "home_page_rels_parent_idx" ON "home_page_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "home_page_rels_path_idx" ON "home_page_rels" ("path");
CREATE INDEX IF NOT EXISTS "services_page_rels_order_idx" ON "services_page_rels" ("order");
CREATE INDEX IF NOT EXISTS "services_page_rels_parent_idx" ON "services_page_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "services_page_rels_path_idx" ON "services_page_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "home_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "services_page"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "services_page_rels" ADD CONSTRAINT "services_page_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "services";
DROP TABLE "users";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "site_config";
DROP TABLE "home_page";
DROP TABLE "home_page_rels";
DROP TABLE "services_page";
DROP TABLE "services_page_rels";`)
};

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`footer_page_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`DROP TABLE \`footer_columns_page_links\`;`)
  await payload.db.drizzle.run(sql`DROP TABLE \`footer_columns\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` ADD \`show_contact\` integer DEFAULT true;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` ADD \`show_google_map\` integer DEFAULT true;`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_page_links_order_idx\` ON \`footer_page_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_page_links_parent_id_idx\` ON \`footer_page_links\` (\`_parent_id\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`footer_columns_page_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`columnType\` text NOT NULL,
  	\`contact_show_contact\` integer DEFAULT 'true',
  	\`google_map_api_key\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await payload.db.drizzle.run(sql`DROP TABLE \`footer_page_links\`;`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_columns_page_links_order_idx\` ON \`footer_columns_page_links\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_columns_page_links_parent_id_idx\` ON \`footer_columns_page_links\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`show_contact\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`show_google_map\`;`)
}

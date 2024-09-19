import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`CREATE TABLE \`meta_images\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`prefix\` text DEFAULT 'meta',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text
  );
  `)
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`meta_images_created_at_idx\` ON \`meta_images\` (\`created_at\`);`)
  await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`meta_images_filename_idx\` ON \`meta_images\` (\`filename\`);`)
  await payload.db.drizzle.run(sql`CREATE INDEX \`meta_images_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`meta_images\` (\`sizes_thumbnail_filename\`);`)
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`DROP TABLE \`meta_images\`;`)
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
  await payload.db.drizzle.run(sql`/*
   SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
   Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                    https://www.sqlite.org/lang_altertable.html
  
   Due to that we don't generate migration automatically and it has to be done manually
  */`)
}

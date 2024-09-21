import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Drop existing tables
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS team;`)
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS _team_v;`)

  // Recreate team table
  await payload.db.drizzle.run(sql`
    CREATE TABLE \`team\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`memberType\` text DEFAULT 'staff',
      \`name\` text,
      \`avatar_id\` integer,
      \`image_id\` integer,
      \`role\` text,
      \`qualifications\` text,
      \`bio\` text,
      \`meta_hide_from_search_engines\` integer DEFAULT false,
      \`meta_metadata_title\` text,
      \`meta_metadata_image_id\` integer,
      \`meta_metadata_description\` text,
      \`published_at\` text,
      \`slug\` text,
      \`slug_lock\` integer DEFAULT true,
      \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`_status\` text DEFAULT 'draft',
      FOREIGN KEY (\`avatar_id\`) REFERENCES \`avatars\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`image_id\`) REFERENCES \`portraits\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`meta_metadata_image_id\`) REFERENCES \`meta_images\`(\`id\`) ON UPDATE no action ON DELETE set null
    );
  `)

  // Recreate _team_v table
  await payload.db.drizzle.run(sql`
    CREATE TABLE \`_team_v\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`parent_id\` integer,
      \`version_memberType\` text DEFAULT 'staff',
      \`version_name\` text,
      \`version_avatar_id\` integer,
      \`version_image_id\` integer,
      \`version_role\` text,
      \`version_qualifications\` text,
      \`version_bio\` text,
      \`version_meta_hide_from_search_engines\` integer DEFAULT false,
      \`version_meta_metadata_title\` text,
      \`version_meta_metadata_image_id\` integer,
      \`version_meta_metadata_description\` text,
      \`version_published_at\` text,
      \`version_slug\` text,
      \`version_slug_lock\` integer DEFAULT true,
      \`version_updated_at\` text,
      \`version_created_at\` text,
      \`version__status\` text DEFAULT 'draft',
      \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`latest\` integer,
      \`autosave\` integer,
      FOREIGN KEY (\`parent_id\`) REFERENCES \`team\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`version_avatar_id\`) REFERENCES \`avatars\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`version_image_id\`) REFERENCES \`portraits\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`version_meta_metadata_image_id\`) REFERENCES \`meta_images\`(\`id\`) ON UPDATE no action ON DELETE set null
    );
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Drop tables created in the up migration
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS team;`)
  await payload.db.drizzle.run(sql`DROP TABLE IF EXISTS _team_v;`)

  // Recreate original team table
  await payload.db.drizzle.run(sql`
    CREATE TABLE \`team\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`memberType\` text DEFAULT 'staff',
      \`name\` text,
      \`avatar_id\` integer,
      \`image_id\` integer,
      \`role\` text,
      \`qualifications\` text,
      \`bio\` text,
      \`meta_hide_from_search_engines\` integer DEFAULT false,
      \`meta_metadata_title\` text,
      \`meta_metadata_image_id\` integer,
      \`meta_metadata_description\` text,
      \`published_at\` text,
      \`slug\` text,
      \`slug_lock\` integer DEFAULT true,
      \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`_status\` text DEFAULT 'draft',
      FOREIGN KEY (\`avatar_id\`) REFERENCES \`avatars\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`image_id\`) REFERENCES \`portraits\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`meta_metadata_image_id\`) REFERENCES \`cards\`(\`id\`) ON UPDATE no action ON DELETE set null
    );
  `)

  // Recreate original _team_v table
  await payload.db.drizzle.run(sql`
    CREATE TABLE \`_team_v\` (
      \`id\` integer PRIMARY KEY NOT NULL,
      \`parent_id\` integer,
      \`version_memberType\` text DEFAULT 'staff',
      \`version_name\` text,
      \`version_avatar_id\` integer,
      \`version_image_id\` integer,
      \`version_role\` text,
      \`version_qualifications\` text,
      \`version_bio\` text,
      \`version_meta_hide_from_search_engines\` integer DEFAULT false,
      \`version_meta_metadata_title\` text,
      \`version_meta_metadata_image_id\` integer,
      \`version_meta_metadata_description\` text,
      \`version_published_at\` text,
      \`version_slug\` text,
      \`version_slug_lock\` integer DEFAULT true,
      \`version_updated_at\` text,
      \`version_created_at\` text,
      \`version__status\` text DEFAULT 'draft',
      \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
      \`latest\` integer,
      \`autosave\` integer,
      FOREIGN KEY (\`parent_id\`) REFERENCES \`team\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`version_avatar_id\`) REFERENCES \`avatars\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`version_image_id\`) REFERENCES \`portraits\`(\`id\`) ON UPDATE no action ON DELETE set null,
      FOREIGN KEY (\`version_meta_metadata_image_id\`) REFERENCES \`cards\`(\`id\`) ON UPDATE no action ON DELETE set null
    );
  `)
}

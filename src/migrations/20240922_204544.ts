import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`high_impact_svg\` integer DEFAULT true;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`high_impact_svg\` integer DEFAULT true;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`avatars\` DROP COLUMN \`prefix\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`cards\` DROP COLUMN \`prefix\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`landscapes\` DROP COLUMN \`prefix\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`portraits\` DROP COLUMN \`prefix\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`meta_images\` DROP COLUMN \`prefix\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`files\` DROP COLUMN \`prefix\`;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`ALTER TABLE \`avatars\` ADD \`prefix\` text DEFAULT 'avatars';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`cards\` ADD \`prefix\` text DEFAULT 'cards';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`landscapes\` ADD \`prefix\` text DEFAULT 'landscapes';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`portraits\` ADD \`prefix\` text DEFAULT 'portraits';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`meta_images\` ADD \`prefix\` text DEFAULT 'meta';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`files\` ADD \`prefix\` text DEFAULT 'files';`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`high_impact_svg\`;`)
  await payload.db.drizzle.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`high_impact_svg\`;`)
}

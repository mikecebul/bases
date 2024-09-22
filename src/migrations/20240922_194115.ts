import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const db = payload.db.drizzle

  // For pages_blocks_hero table
  await db.run(
    sql`ALTER TABLE pages_blocks_hero ADD COLUMN new_high_impact_title TEXT DEFAULT 'Welcome to Our Website'`,
  )
  await db.run(
    sql`ALTER TABLE pages_blocks_hero ADD COLUMN new_high_impact_description TEXT DEFAULT 'Discover our services and offerings'`,
  )

  await db.run(sql`
    UPDATE pages_blocks_hero 
    SET new_high_impact_title = COALESCE(high_impact_title, 'Welcome to Our Website'),
        new_high_impact_description = COALESCE(high_impact_description, 'Discover our services and offerings')
  `)

  await db.run(sql`ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_title`)
  await db.run(sql`ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_description`)

  await db.run(
    sql`ALTER TABLE pages_blocks_hero RENAME COLUMN new_high_impact_title TO high_impact_title`,
  )
  await db.run(
    sql`ALTER TABLE pages_blocks_hero RENAME COLUMN new_high_impact_description TO high_impact_description`,
  )

  // For _pages_v_blocks_hero table
  await db.run(
    sql`ALTER TABLE _pages_v_blocks_hero ADD COLUMN new_high_impact_title TEXT DEFAULT 'Welcome to Our Website'`,
  )
  await db.run(
    sql`ALTER TABLE _pages_v_blocks_hero ADD COLUMN new_high_impact_description TEXT DEFAULT 'Discover our services and offerings'`,
  )

  await db.run(sql`
    UPDATE _pages_v_blocks_hero 
    SET new_high_impact_title = COALESCE(high_impact_title, 'Welcome to Our Website'),
        new_high_impact_description = COALESCE(high_impact_description, 'Discover our services and offerings')
  `)

  await db.run(sql`ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_title`)
  await db.run(sql`ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_description`)

  await db.run(
    sql`ALTER TABLE _pages_v_blocks_hero RENAME COLUMN new_high_impact_title TO high_impact_title`,
  )
  await db.run(
    sql`ALTER TABLE _pages_v_blocks_hero RENAME COLUMN new_high_impact_description TO high_impact_description`,
  )
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const db = payload.db.drizzle

  // For pages_blocks_hero table
  await db.run(sql`ALTER TABLE pages_blocks_hero ADD COLUMN old_high_impact_title TEXT`)
  await db.run(sql`ALTER TABLE pages_blocks_hero ADD COLUMN old_high_impact_description TEXT`)

  await db.run(sql`
    UPDATE pages_blocks_hero 
    SET old_high_impact_title = high_impact_title,
        old_high_impact_description = high_impact_description
  `)

  await db.run(sql`ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_title`)
  await db.run(sql`ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_description`)

  await db.run(
    sql`ALTER TABLE pages_blocks_hero RENAME COLUMN old_high_impact_title TO high_impact_title`,
  )
  await db.run(
    sql`ALTER TABLE pages_blocks_hero RENAME COLUMN old_high_impact_description TO high_impact_description`,
  )

  // For _pages_v_blocks_hero table
  await db.run(sql`ALTER TABLE _pages_v_blocks_hero ADD COLUMN old_high_impact_title TEXT`)
  await db.run(sql`ALTER TABLE _pages_v_blocks_hero ADD COLUMN old_high_impact_description TEXT`)

  await db.run(sql`
    UPDATE _pages_v_blocks_hero 
    SET old_high_impact_title = high_impact_title,
        old_high_impact_description = high_impact_description
  `)

  await db.run(sql`ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_title`)
  await db.run(sql`ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_description`)

  await db.run(
    sql`ALTER TABLE _pages_v_blocks_hero RENAME COLUMN old_high_impact_title TO high_impact_title`,
  )
  await db.run(
    sql`ALTER TABLE _pages_v_blocks_hero RENAME COLUMN old_high_impact_description TO high_impact_description`,
  )
}

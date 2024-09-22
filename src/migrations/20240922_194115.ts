import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.run(sql`
    -- For pages_blocks_hero table
    ALTER TABLE pages_blocks_hero ADD COLUMN new_high_impact_title TEXT DEFAULT 'Welcome to Our Website';
    ALTER TABLE pages_blocks_hero ADD COLUMN new_high_impact_description TEXT DEFAULT 'Discover our services and offerings';

    UPDATE pages_blocks_hero 
    SET new_high_impact_title = COALESCE(high_impact_title, 'Welcome to Our Website'),
        new_high_impact_description = COALESCE(high_impact_description, 'Discover our services and offerings');

    ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_title;
    ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_description;

    ALTER TABLE pages_blocks_hero RENAME COLUMN new_high_impact_title TO high_impact_title;
    ALTER TABLE pages_blocks_hero RENAME COLUMN new_high_impact_description TO high_impact_description;

    -- For _pages_v_blocks_hero table
    ALTER TABLE _pages_v_blocks_hero ADD COLUMN new_high_impact_title TEXT DEFAULT 'Welcome to Our Website';
    ALTER TABLE _pages_v_blocks_hero ADD COLUMN new_high_impact_description TEXT DEFAULT 'Discover our services and offerings';

    UPDATE _pages_v_blocks_hero 
    SET new_high_impact_title = COALESCE(high_impact_title, 'Welcome to Our Website'),
        new_high_impact_description = COALESCE(high_impact_description, 'Discover our services and offerings');

    ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_title;
    ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_description;

    ALTER TABLE _pages_v_blocks_hero RENAME COLUMN new_high_impact_title TO high_impact_title;
    ALTER TABLE _pages_v_blocks_hero RENAME COLUMN new_high_impact_description TO high_impact_description;
  `)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.run(sql`
    -- For pages_blocks_hero table
    ALTER TABLE pages_blocks_hero ADD COLUMN old_high_impact_title TEXT;
    ALTER TABLE pages_blocks_hero ADD COLUMN old_high_impact_description TEXT;

    UPDATE pages_blocks_hero 
    SET old_high_impact_title = high_impact_title,
        old_high_impact_description = high_impact_description;

    ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_title;
    ALTER TABLE pages_blocks_hero DROP COLUMN high_impact_description;

    ALTER TABLE pages_blocks_hero RENAME COLUMN old_high_impact_title TO high_impact_title;
    ALTER TABLE pages_blocks_hero RENAME COLUMN old_high_impact_description TO high_impact_description;

    -- For _pages_v_blocks_hero table
    ALTER TABLE _pages_v_blocks_hero ADD COLUMN old_high_impact_title TEXT;
    ALTER TABLE _pages_v_blocks_hero ADD COLUMN old_high_impact_description TEXT;

    UPDATE _pages_v_blocks_hero 
    SET old_high_impact_title = high_impact_title,
        old_high_impact_description = high_impact_description;

    ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_title;
    ALTER TABLE _pages_v_blocks_hero DROP COLUMN high_impact_description;

    ALTER TABLE _pages_v_blocks_hero RENAME COLUMN old_high_impact_title TO high_impact_title;
    ALTER TABLE _pages_v_blocks_hero RENAME COLUMN old_high_impact_description TO high_impact_description;
  `)
}

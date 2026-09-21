import {
	pgTable,
	serial,
	integer,
	text,
	boolean,
	timestamp,
	type AnyPgColumn,
	pgEnum
} from 'drizzle-orm/pg-core';

// Stores the category, not the specific format.
// The actual format (mp4, mov, flac, …) lives in the mimeType text column.
export const fileTypeEnum = pgEnum('file_kind', [
	'image',
	'video',
	'audio',
	'pdf',
	'doc',
	'sheet',
	'presentation',
	'archive',
	'figma',
	'code',
	'other'
]);

export const task = pgTable('task', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const user = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password'),
	emailVerified: boolean('email_verified').default(true),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export const folders = pgTable('folder', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	parentId: text('parent_id').references((): AnyPgColumn => folders.id),
	createdAt: timestamp('created_at').defaultNow()
});

export const file = pgTable('file', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	size: text('size').notNull(), // in string like 4.3MB,
	sizeBytes: integer('size_bytes').notNull(), // in bytes
	type: fileTypeEnum('kind').notNull(), // category (video, audio…)
	// mimeType: text('mime_type').notNull(),              // exact format (video/mp4, audio/flac…)
	key: text('key').notNull(), // R2 object key
	folderId: text('folder_id').references(() => folders.id),
	starred: boolean('starred').notNull().default(false),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
});

export type FileSelect = typeof file.$inferSelect

export * from './auth.schema';

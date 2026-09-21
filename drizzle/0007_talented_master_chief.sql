ALTER TABLE "file" ALTER COLUMN "size" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "size_bytes" integer NOT NULL;
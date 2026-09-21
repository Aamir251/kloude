CREATE TYPE "public"."file_kind" AS ENUM('image', 'video', 'audio', 'pdf', 'doc', 'sheet', 'presentation', 'archive', 'figma', 'code', 'other');--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "size" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "kind" "file_kind" NOT NULL;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "starred" boolean DEFAULT false NOT NULL;
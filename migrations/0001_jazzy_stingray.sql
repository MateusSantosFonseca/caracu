CREATE TABLE `player` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`team_id` text NOT NULL,
	`rating` integer NOT NULL,
	`text` text NOT NULL,
	`stamina` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
DROP TABLE `guestbook`;
CREATE TABLE `player` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`team_id` text NOT NULL,
	`rating` integer NOT NULL,
	`active` integer,
	`position` text NOT NULL,
	`stamina` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);

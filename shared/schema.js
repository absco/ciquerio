import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export var users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});
export var contactSubmissions = pgTable("contact_submissions", {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    company: text("company"),
    service: text("service").notNull(),
    message: text("message").notNull(),
    privacyPolicy: boolean("privacy_policy").notNull(),
    createdAt: text("created_at").notNull(),
});
export var insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
});
export var insertContactSchema = createInsertSchema(contactSubmissions).pick({
    firstName: true,
    lastName: true,
    email: true,
    company: true,
    service: true,
    message: true,
    privacyPolicy: true,
});

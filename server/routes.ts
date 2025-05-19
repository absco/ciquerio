import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body against the schema
      const contactData = insertContactSchema.parse(req.body);
      
      // Create a timestamp
      const submission = {
        ...contactData,
        createdAt: new Date().toISOString()
      };
      
      // Store the contact submission
      await storage.createContactSubmission(submission);
      
      // Set up the email transporter (using environment variables for smtp config)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER || "ethereal.user@ethereal.email",
          pass: process.env.SMTP_PASS || "ethereal_pass"
        }
      });
      
      // Setup email data
      const mailOptions = {
        from: process.env.EMAIL_FROM || "no-reply@ciquerio.com",
        to: "info@ciquerio.com",
        subject: `New Contact Form Submission from ${contactData.firstName} ${contactData.lastName}`,
        text: `
          Name: ${contactData.firstName} ${contactData.lastName}
          Email: ${contactData.email}
          Company: ${contactData.company || "Not provided"}
          Service of Interest: ${contactData.service}
          
          Message:
          ${contactData.message}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Company:</strong> ${contactData.company || "Not provided"}</p>
          <p><strong>Service of Interest:</strong> ${contactData.service}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message.replace(/\n/g, "<br>")}</p>
        `
      };
      
      // Send the email
      await transporter.sendMail(mailOptions);
      
      // Return a success response
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      // Log the error
      console.error("Contact form submission error:", error);
      
      // Return a generic error message
      res.status(500).json({ message: "Failed to submit contact form. Please try again later." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

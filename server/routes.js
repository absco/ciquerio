var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createServer } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
export function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var httpServer;
        var _this = this;
        return __generator(this, function (_a) {
            // Contact form submission endpoint
            app.post("/api/contact", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var contactData, submission, transporter, mailOptions, error_1, validationError;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            contactData = insertContactSchema.parse(req.body);
                            submission = __assign(__assign({}, contactData), { createdAt: new Date().toISOString() });
                            // Store the contact submission
                            return [4 /*yield*/, storage.createContactSubmission(submission)];
                        case 1:
                            // Store the contact submission
                            _a.sent();
                            transporter = nodemailer.createTransport({
                                host: process.env.SMTP_HOST || "smtp.ethereal.email",
                                port: parseInt(process.env.SMTP_PORT || "587"),
                                secure: process.env.SMTP_SECURE === "true",
                                auth: {
                                    user: process.env.SMTP_USER || "ethereal.user@ethereal.email",
                                    pass: process.env.SMTP_PASS || "ethereal_pass"
                                }
                            });
                            mailOptions = {
                                from: process.env.EMAIL_FROM || "no-reply@ciquerio.com",
                                to: "info@ciquerio.com",
                                subject: "New Contact Form Submission from ".concat(contactData.firstName, " ").concat(contactData.lastName),
                                text: "\n          Name: ".concat(contactData.firstName, " ").concat(contactData.lastName, "\n          Email: ").concat(contactData.email, "\n          Company: ").concat(contactData.company || "Not provided", "\n          Service of Interest: ").concat(contactData.service, "\n          \n          Message:\n          ").concat(contactData.message, "\n        "),
                                html: "\n          <h2>New Contact Form Submission</h2>\n          <p><strong>Name:</strong> ".concat(contactData.firstName, " ").concat(contactData.lastName, "</p>\n          <p><strong>Email:</strong> ").concat(contactData.email, "</p>\n          <p><strong>Company:</strong> ").concat(contactData.company || "Not provided", "</p>\n          <p><strong>Service of Interest:</strong> ").concat(contactData.service, "</p>\n          <p><strong>Message:</strong></p>\n          <p>").concat(contactData.message.replace(/\n/g, "<br>"), "</p>\n        ")
                            };
                            // Send the email
                            return [4 /*yield*/, transporter.sendMail(mailOptions)];
                        case 2:
                            // Send the email
                            _a.sent();
                            // Return a success response
                            res.status(200).json({ message: "Contact form submitted successfully" });
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            // Handle validation errors
                            if (error_1 instanceof ZodError) {
                                validationError = fromZodError(error_1);
                                return [2 /*return*/, res.status(400).json({
                                        message: "Validation error",
                                        errors: validationError.details
                                    })];
                            }
                            // Log the error
                            console.error("Contact form submission error:", error_1);
                            // Return a generic error message
                            res.status(500).json({ message: "Failed to submit contact form. Please try again later." });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            httpServer = createServer(app);
            return [2 /*return*/, httpServer];
        });
    });
}

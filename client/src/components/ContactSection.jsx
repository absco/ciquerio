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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RectangleEllipsis, Clock, ShieldCheck } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
var contactFormSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    company: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
    privacyPolicy: z.literal(true, {
        errorMap: function () { return ({ message: "You must accept the privacy policy" }); },
    }),
});
export default function ContactSection() {
    var _this = this;
    var _a = useState(false), isSubmitting = _a[0], setIsSubmitting = _a[1];
    var _b = useState(false), isSuccess = _b[0], setIsSuccess = _b[1];
    var toast = useToast().toast;
    var form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            message: "",
            privacyPolicy: true,
        },
    });
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, apiRequest("POST", "/api/contact", data)];
                case 2:
                    _a.sent();
                    setIsSuccess(true);
                    form.reset();
                    toast({
                        title: "Message sent successfully!",
                        description: "We'll get back to you shortly.",
                        variant: "default",
                    });
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    toast({
                        title: "Error sending message",
                        description: "Please try again later.",
                        variant: "destructive",
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-neutral-500 max-w-3xl mx-auto">
            Ready to transform your IT infrastructure? Contact us today for a consultation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md h-full">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                    <RectangleEllipsis className="h-5 w-5 text-primary"/>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium mb-1">Email Us</h4>
                    <p className="text-neutral-500">info@ciquerio.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-primary"/>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium mb-1">Business Hours</h4>
                    <p className="text-neutral-500">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                    <ShieldCheck className="h-5 w-5 text-primary"/>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium mb-1">Data Security</h4>
                    <p className="text-neutral-500">
                      Your information is encrypted and securely stored.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            {isSuccess ? (<div className="bg-white p-8 rounded-xl shadow-md text-center py-12">
                <div className="text-5xl text-green-500 mb-4">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-neutral-500 mb-6">
                  Thank you for contacting Ciquerio. We'll get back to you shortly.
                </p>
                <Button onClick={function () { return setIsSuccess(false); }}>
                  Send Another Message
                </Button>
              </div>) : (<Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormField control={form.control} name="firstName" render={function (_a) {
                var field = _a.field;
                return (<FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your first name" {...field} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>);
            }}/>

                    <FormField control={form.control} name="lastName" render={function (_a) {
                var field = _a.field;
                return (<FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your last name" {...field} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>);
            }}/>
                  </div>

                  <FormField control={form.control} name="email" render={function (_a) {
                var field = _a.field;
                return (<FormItem className="mb-6">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email address" {...field} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>);
            }}/>

                  <FormField control={form.control} name="company" render={function (_a) {
                var field = _a.field;
                return (<FormItem className="mb-6">
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company name" {...field} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>);
            }}/>



                  <FormField control={form.control} name="message" render={function (_a) {
                var field = _a.field;
                return (<FormItem className="mb-6">
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your project or inquiry" rows={5} {...field} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>);
            }}/>

                  <FormField control={form.control} name="privacyPolicy" render={function (_a) {
                var field = _a.field;
                return (<FormItem className="mb-6">
                        <div className="flex items-start space-x-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"/>
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="ml-3 text-sm text-neutral-500">
                              I agree to the <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and consent to be contacted regarding my inquiry.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>);
            }}/>

                  <div className="text-center">
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-colors w-full md:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </Form>)}
          </div>
        </div>
      </div>
    </section>);
}

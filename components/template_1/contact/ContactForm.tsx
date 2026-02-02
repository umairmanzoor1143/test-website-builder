"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getContrastColor } from "../utils/theme";
import { sendContactMessage } from "@/app/services/api";

// Declare grecaptcha enterprise types
// declare const grecaptcha: {
//   enterprise: {
//     ready(cb: () => void): void;
//     execute(siteKey: string, options: { action: string }): Promise<string>;
//   };
// };

// const RECAPTCHA_SITE_KEY = "6Lf2cMErAAAAAHVQxezb60U3dNSU1G04MtWpn21Z";

interface ContactFormProps {
  accentColor: string;
  textColor: string;
  companyId: string;
}


export default function ContactForm({
  accentColor,
  textColor,
  companyId,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Wait for reCAPTCHA Enterprise to be available
      // if (typeof grecaptcha === "undefined" || !grecaptcha.enterprise) {
      //   throw new Error("reCAPTCHA not loaded. Please refresh the page and try again.");
      // }

      // Get reCAPTCHA Enterprise token
      // const token = await new Promise<string>((resolve, reject) => {
      //   grecaptcha.enterprise.ready(async () => {
      //     try {
      //       const token = await grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
      //         action: "contact_form"
      //       });
      //       resolve(token);
      //     } catch (err) {
      //       console.error("reCAPTCHA execute error:", err);
      //       reject(new Error("Failed to verify reCAPTCHA. Please try again."));
      //     }
      //   });
      // });

      // if (!token) {
      //   throw new Error("Failed to get reCAPTCHA token");
      // }

      await sendContactMessage(companyId, {
        companyId,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        // token,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");

      // Provide more specific error message for authorization issues
      if (error instanceof Error) {
        if (error.message.includes("Authorization") || error.message.includes("403")) {
          setErrorMessage("reCAPTCHA verification failed. Please ensure you are on the authorized domain.");
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 opacity-80"
            style={{ color: textColor }}
          >
            Vollständiger Name <span style={{ color: accentColor }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Max Mustermann"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-lg bg-transparent border transition-all duration-300 focus:outline-none"
            style={{
              color: textColor,
              borderColor: `${textColor}20`,
              backgroundColor: `${textColor}05`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = accentColor;
              e.target.style.boxShadow = `0 0 0 3px ${accentColor}15`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${textColor}20`;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 opacity-80"
            style={{ color: textColor }}
          >
            E-Mail-Adresse <span style={{ color: accentColor }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="max@beispiel.de"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-lg bg-transparent border transition-all duration-300 focus:outline-none"
            style={{
              color: textColor,
              borderColor: `${textColor}20`,
              backgroundColor: `${textColor}05`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = accentColor;
              e.target.style.boxShadow = `0 0 0 3px ${accentColor}15`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${textColor}20`;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2 opacity-80"
            style={{ color: textColor }}
          >
            Ihre Nachricht <span style={{ color: accentColor }}>*</span>
          </label>
          <textarea
            id="message"
            placeholder="Erzählen Sie uns mehr über Ihre Anfrage..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-transparent border transition-all duration-300 focus:outline-none resize-none"
            style={{
              color: textColor,
              borderColor: `${textColor}20`,
              backgroundColor: `${textColor}05`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = accentColor;
              e.target.style.boxShadow = `0 0 0 3px ${accentColor}15`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${textColor}20`;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <div
            className="p-4 rounded-lg text-sm"
            style={{
              backgroundColor: "#10b98120",
              color: "#10b981",
              border: "1px solid #10b98140",
            }}
          >
            ✓ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
          </div>
        )}
        {submitStatus === "error" && (
          <div
            className="p-4 rounded-lg text-sm"
            style={{
              backgroundColor: "#ef444420",
              color: "#ef4444",
              border: "1px solid #ef444440",
            }}
          >
            ✕ {errorMessage || "Etwas ist schief gelaufen. Bitte versuchen Sie es später erneut."}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs opacity-50" style={{ color: textColor }}>
            <span style={{ color: accentColor }}>*</span> Pflichtfelder
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="accent"
            size="xl"
            style={{
              backgroundColor: accentColor,
              color: getContrastColor(accentColor),
              boxShadow: `0 4px 14px ${accentColor}40`,
            }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Senden...
              </>
            ) : (
              <>
                Nachricht senden
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

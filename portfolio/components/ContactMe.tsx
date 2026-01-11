"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ContactMeProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    toEmail?: string;
}

export default function ContactMe({ open, onOpenChange, toEmail = "jtquach@cougarnet.uh.edu" }: ContactMeProps) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const subject = `Portfolio Contact from ${name} || Portfolio`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[min(96vw,520px)] p-0 bg-white dark:bg-black/95 text-gray-900 dark:text-white border border-gray-200 dark:border-orange-500/20">
              <div className = "p-6">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-bold text-orange-500">
                            Contact Me
                        </DialogTitle>
                    </DialogHeader>
                    

                    <div className="mt-6 space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 dark:border-orange-500/20 bg-gray-50 dark:bg-white/5 px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20 "
                        />

                        <input
                            type="text"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 dark:border-orange-500/20 bg-gray-50 dark:bg-white/5 px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20 "
                        />

                        <textarea
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={6}
                            className="w-full resize-none rounded-xl border border-gray-200 dark:border-orange-500/20 bg-gray-50 dark:bg-white/5 px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/20"
                        />

                    </div>

                    <Button
                        asChild
                        className="mt-6 w-full border border-orange-500/30 bg-orange-500/15 text-orange-500 hover:bg-orange-500/20 hover:text-orange-300"
                    ></Button>

                    <p className="mt-4 text-center text-sm text-gray-600 dark:text-white/60">
                        Or email me directly at{" "}
                        <a
                        href={`mailto:${toEmail}`}
                        className="text-orange-500 hover:text-orange-400 hover:underline"
                        >
                        {toEmail}
                        </a>
                    </p>

                </div>
            </DialogContent>
        </Dialog>
    )
}

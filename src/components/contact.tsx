import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '@/lib/social-links';

export function Contact() {
  return (
    <section className="relative z-10 mx-auto mt-8 w-full">
      <div className="bg-accent rounded-3xl px-5 py-8 sm:px-10 md:px-16 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-3xl font-semibold md:text-4xl">Contacts</h2>
          <span className="text-muted-foreground">@umair</span>
        </div>
        <p className="mt-4 text-neutral-600">
          I’m most available on WhatsApp and Upwork.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900"
          >
            <Image
              src="/whatsapp.png"
              alt=""
              height={24}
              width={24}
              className="rounded-full bg-white p-0.5"
            />
            Message on WhatsApp
          </a>
          <a
            href={socialLinks.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-emerald-800 bg-white px-5 py-3 font-semibold text-emerald-900 hover:bg-emerald-50"
          >
            <Image src="/upworkicon.png" alt="" height={24} width={24} />
            Hire me on Upwork
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <a
            href="mailto:umair.official.pk@gmail.com"
            className="underline underline-offset-4"
          >
            umair.official.pk@gmail.com
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            LinkedIn <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;

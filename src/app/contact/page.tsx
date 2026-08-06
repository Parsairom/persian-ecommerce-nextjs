import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, TelegramIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "تماس با ما",
};

export default function ContactPage() {
  return (
    <div className="py-8 md:py-12">
      <Container>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold md:text-3xl">ارتباط با ما</h1>
          <p className="mt-2 text-sm text-foreground-muted">تیم موبایل پیشرو همیشه پاسخگوی شماست</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعیت فروشگاه موبایل پیشرو در کرمان"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard icon={<MapPin className="size-5" />} title="آدرس فروشگاه" lines={[siteConfig.address]} />
              <InfoCard icon={<Phone className="size-5" />} title="تلفن تماس" lines={[siteConfig.phone, siteConfig.supportPhone]} dir="ltr" />
              <InfoCard icon={<Mail className="size-5" />} title="ایمیل" lines={[siteConfig.email]} dir="ltr" />
              <InfoCard
                icon={<Clock className="size-5" />}
                title="ساعات کاری"
                lines={siteConfig.workingHours.map((w) => `${w.day}: ${w.hours}`)}
              />
            </div>

            <div className="flex items-center gap-3">
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm hover:border-gold hover:text-gold">
                <InstagramIcon className="size-4" />
                اینستاگرام
              </a>
              <a href={siteConfig.telegram} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm hover:border-gold hover:text-gold">
                <TelegramIcon className="size-4" />
                تلگرام
              </a>
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm hover:border-gold hover:text-gold">
                <WhatsappIcon className="size-4" />
                واتساپ
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-4 text-base font-bold">فرم تماس با ما</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

function InfoCard({ icon, title, lines, dir }: { icon: React.ReactNode; title: string; lines: string[]; dir?: "ltr" | "rtl" }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <span className="mb-2 inline-flex size-9 items-center justify-center rounded-full bg-gold/10 text-gold">{icon}</span>
      <p className="text-sm font-bold">{title}</p>
      {lines.map((l) => (
        <p key={l} dir={dir} className="mt-1 text-xs leading-6 text-foreground-muted">
          {l}
        </p>
      ))}
    </div>
  );
}

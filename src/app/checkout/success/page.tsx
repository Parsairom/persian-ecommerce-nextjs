import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { faDigits } from "@/lib/utils";

export default function CheckoutSuccessPage() {
  const orderNumber = "MP-140305-" + faDigits(1234);

  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <span className="flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
        <CheckCircle2 className="size-10" />
      </span>
      <h1 className="text-2xl font-bold">سفارش شما با موفقیت ثبت شد</h1>
      <p className="max-w-md text-sm text-foreground-muted">
        شماره سفارش شما {orderNumber} می‌باشد. جزئیات و کد پیگیری از طریق پیامک و بخش «سفارش‌های من» در دسترس خواهد بود.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <LinkButton href="/account/orders" variant="outline">
          پیگیری سفارش
        </LinkButton>
        <LinkButton href="/products">ادامه خرید</LinkButton>
      </div>
    </Container>
  );
}

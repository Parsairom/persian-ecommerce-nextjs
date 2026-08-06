import { Container } from "@/components/ui/Container";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <Container className="py-8 md:py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </Container>
  );
}

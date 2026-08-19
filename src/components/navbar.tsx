import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { ShoppingBasket } from "lucide-react";
import CountCartItem from "@/app/(front)/components/CountCartItem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <nav className="border-b-[3px] border-black bg-background">
      <div className="mx-auto flex h-16 max-w-(--breakpoint-xl) items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <Link href="/cart" data-slot="cart-link" className="inline-flex items-center gap-2 text-foreground no-underline">
          <Badge className="px-3 py-1.5 text-sm">
            <ShoppingBasket /> <CountCartItem /> ชิ้น
          </Badge>
        </Link>

        <div className="flex items-center gap-3">

          {
            !session && (
              <>
                <Button asChild className="hidden sm:inline-flex" variant="outline">
                  <Link href="/login">เข้าสู่ระบบ</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">สมัครสมาชิก</Link>
                </Button>
              </>
            )
          }

          {
            session && (
              <>
                <div className="hidden items-center font-mono text-sm sm:flex">
                  สวัสดี, {session.user.name}
                </div>
                <div>
                  <LogoutButton />
                </div>
              </>
            )
          }

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
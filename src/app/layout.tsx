import HeaderTop from "@/components/HeaderTop";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/Cart/Sidebar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { restoreCart } from "@/slices/bagSlice";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  function showSidebar() {
    setShow(true);
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    setShow(false);
    document.body.style.overflow = "auto";
  }
  useEffect(() => {
    const CART = localStorage?.getItem("CART");
    if (CART) {
      dispatch(restoreCart(JSON.parse(CART)));
    }
  }, []);

  return (
    <div className="relative font-Ubuntu flex flex-col h-full">
      <CartSidebar show={show} onCloseSidebar={closeSidebar} />
      <div className="fixed w-full">
        <HeaderTop onActiveSidebar={showSidebar} />
      </div>
      <div className="flex-none h-16"></div>
      <div className="custom-container flex-1">{children}</div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
}

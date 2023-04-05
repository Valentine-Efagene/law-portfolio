import DesktopNav from "@/components/nav/DesktopNav";
import styles from "./Layout.module.css";
import Footer from "@/components/home/Footer";
import MobileNav from "@/components/nav/MobileNav";
import ContactBar from "@/components/nav/ContactBar/ContactBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ContactBar />
      <DesktopNav className={styles.desktopNav} />
      <MobileNav className={styles.desktopNav} />
      {children}
      <Footer />
    </div>
  );
}

import DesktopNav from "@/components/nav/DesktopNav";
import styles from "./Layout.module.css";
import Footer from "@/components/home/Footer";
import MobileNav from "@/components/nav/MobileNav";
import ContactBar from "@/components/nav/ContactBar/ContactBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ContactBar />
      <DesktopNav className={styles.nav} />
      <MobileNav className={styles.nav} />
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;

import DesktopNav from "@/components/nav/DesktopNav";
import styles from "./Layout.module.css";
import "@/styles/globals.css";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DesktopNav className={styles.desktopNav} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
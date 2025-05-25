import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";
import NavbarPage from "./Navbar";
import FooterPage from "./Footer";

interface PropTypes {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { title, children } = props;
  return (
    <div className="w-full">
      <PageHead title={title} />
      <NavbarPage />
      <main>
        <div className="py-10">{children}</div>
      </main>
      <FooterPage />
    </div>
  );
};

export default LandingPageLayout;

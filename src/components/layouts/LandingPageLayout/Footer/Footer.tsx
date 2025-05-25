import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, SOCIALS_ITEMS } from "../LandingPageConstant";

const FooterPage = () => {
  return (
    <div className="flex flex-col w-full bg-blue-950 items-center p-6 justify-between text-center md:flex-row md:text-left xl:p-20">
      <Image src={"/images/logowhite.png"} alt="logo" width={200} height={50} />

      <div className="mb-4 flex flex-col gap-4 md:mb-0">
        <div>
          <h4 className="text-xl text-white">Customer Service</h4>
          <p className="text-gray-600">
            <Link href="mailto:hello@acara.id">hello@yondaime</Link> | {""}
            <Link href="tel:+6212345678086">+62 12345678086</Link>
          </p>
        </div>
        <div>
          <h4 className="text-xl text-white">Studio</h4>
          <p className="text-gray-600">Jl. Jend. Sudirman no 79, Jakarta</p>
        </div>
      </div>
      <div className="mb-10 flex flex-col lg:mb-0 gap-2">
        <h2 className="text-xl text-white lg:mb-2">Menu</h2>
        {NAV_ITEMS.map((item) => (
          <Link
            key={`footer-nav-${item.label}`}
            href={item.href}
            className="cursor-pointer text-gray-600 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 text-gray-600">
          {SOCIALS_ITEMS.map((item) => (
            <Link
              key={`footer-social-${item.label}`}
              href={item.href}
              className="text-3xl hover:text-white"
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <p className="w-full text-center text-gray-600 hover:text-white">
          Copyright © 2025 Yondaime. All right reserved
        </p>
      </div>
    </div>
  );
};

export default FooterPage;

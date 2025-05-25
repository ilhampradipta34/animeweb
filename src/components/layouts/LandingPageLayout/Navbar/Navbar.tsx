import {
  Input,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { Image } from "@heroui/image";
import { NAV_ITEMS, NAV_ITEMS_MOBILE } from "../LandingPageConstant";
import { cn } from "@/utils/cn";
import { CiSearch } from "react-icons/ci";
import useNavbar from "./useNavbar";
import { Anime } from "@/types/Anime";
import { useRouter } from "next/router";
import DarkModeToggle from "../../ui/ToggleDarkLight";

const NavbarPage = () => {
  const {
    dataAnimeSearch,
    handleSearch,
    isLoadingAnimeSearch,
    isRefetchingAnimeSearch,
    search,
    setSearch,
  } = useNavbar();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  return (
    <>
      <Navbar
        maxWidth="full"
        isBordered={false}
        isBlurred
        className="sticky top-0 left-0 z-30 w-full bg-transparent dark:bg-black border-b dark:border-b-white"
      >
        <div className="flex items-center gap-10">
          <NavbarBrand as={Link} href="/">
            <Image
              src="/images/llogo.png"
              alt="logo"
              width={100}
              height={50}
              className="cursor-pointer hidden md:flex"
            />
          </NavbarBrand>
          <NavbarContent className="hidden md:flex ">
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={`nav-${item.label}`}
                as={Link}
                href={item.href}
                className={cn(
                  "font-semibold hover:text-transparent hover:bg-clip-text text-blue-600 hover:bg-gradient-to-r hover:from-[#0575E6] hover:to-[#021B79] transition-all duration-300",
                  {
                    "font-bold text-blue-600 border-b-2 border-blue-700 rounded-b-md":
                      isActive(item.href),
                  }
                )}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
        <NavbarContent justify="end">
          <NavbarItem className="md:relative flex gap-4">
            <Input
              isClearable
              className="w-[230px]"
              placeholder="search nama anime"
              startContent={<CiSearch />}
              onClear={() => setSearch("")}
              onChange={handleSearch}
            />
            {search !== "" && (
              <Listbox
                items={dataAnimeSearch?.data || []}
                className="absolute top-14 w-52 max-h-64 md:right-0 md:top-12 md:max-h-96 rounded-xl border dark:bg-slate-800 bg-white overflow-y-auto scroll-smooth"
              >
                {!isLoadingAnimeSearch && !isRefetchingAnimeSearch ? (
                  (item: Anime) => (
                    <ListboxItem
                      key={item.mal_id}
                      href={`list-anime/anime/${item.mal_id}`}
                    >
                      <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                        <Image
                          src={`${item.images.jpg.image_url}`}
                          alt={`${item.title}`}
                          className="rounded-md object-cover"
                          width={100}
                          height={40}
                        />
                        <p className="line-clamp-2 w-3/5 text-wrap">
                          {item.title}
                        </p>
                      </div>
                    </ListboxItem>
                  )
                ) : (
                  <ListboxItem key="loading">
                    <Spinner color="danger" size="sm" />
                  </ListboxItem>
                )}
              </Listbox>
            )}
            <div className="flex items-center ml-2">
              <DarkModeToggle />
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {/* Ini hanya muncul di mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 px-4 py-2 bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700">
        <div className="flex justify-around">
          {NAV_ITEMS_MOBILE.map((item) => (
            <Link
              key={`navmobile-${item.label}`}
              href={item.href}
              className={cn(
                "flex flex-col items-center text-xs font-medium text-white hover:text-blue-800 transition gap-1",
                {
                  "font-bold border-b-2 text-blue-600 border-blue-700":
                    isActive(item.href),
                }
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavbarPage;

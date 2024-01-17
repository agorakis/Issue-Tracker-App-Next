"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((item) => (
          <Link
            key={item.href}
            className={classnames({
              "text-zinc-900": currentPath === item.href,
              "text-zinc-500": currentPath !== item.href,
              "hover:text-zinc-800  transition-colors": true,
            })}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;

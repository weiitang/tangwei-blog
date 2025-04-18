import Link from "next/link";

const Header = () => {
  // const LINKS = JSON.parse(process.env.NEXT_PUBLIC_LINKS || "[]");
  const LINKS = [{ "label": "Github", "src": "https://github.com/weiitang"},{ "label": "JueJin", "src": "https://juejin.cn/user/2084329779640823"}]
  return (
    <header className="sticky top-0 left-0 z-10 w-full h-20 leading-20 flex items-center justify-between px-8 bg-white">
      <Link className="text-3xl" href="/">
        TangWei.io
        <span className="text-sm hidden md:inline-block ml-2">
          逆转一切
        </span>
        <p className="md:hidden text-sm mt-1">
          逆转一切
        </p>
      </Link>

      <ul className="flex gap-4">
        {LINKS.map((link: { label: string; src: string }) => (
          <Link
            target="_black"
            className="font-bold"
            href={link.src}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
        <Link className="font-bold" href="/about">
          About
        </Link>
      </ul>
    </header>
  );
};

export default Header;

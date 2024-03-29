import { strings } from "../strings";

function Header() {
  return (
    <header
      className="
        w-full
      "
    >
      <h1
        className="
          sm:text-2xl
          lg:text-4xl 
          text-center
          lg:text-left
          border-2
          bg-customgreen
          py-8
          px-4
          text-white
          tracking-wider
          text-gray-900
        "
      >
        {strings.header.prefix}{" "}
        <span className="text-gold font-bold uppercase">
          {strings.header.main}
        </span>
      </h1>
    </header>
  );
}

export default Header;

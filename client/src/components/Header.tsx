function Header() {
  return (
    <header
      className="
        w-full
      "
    >
      <h1
        className="
          text-3xl 
          text-center
          lg:text-left
          border-2
          bg-customgreen
          py-8
          px-4
          text-white
          tracking-wider
          text-gray-400
        "
      >
        Track your{" "}
        <span className="text-gold font-bold uppercase">Net Worth</span>
      </h1>
    </header>
  );
}

export default Header;

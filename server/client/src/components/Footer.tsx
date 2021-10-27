function Footer() {
  return (
    <footer
      className="
        w-full
        py-4
      "
    >
      <p
        className="
          text-sm
          text-gray-400
          text-center
        "
      >
        Made with <span className="text-red-700">&hearts;</span>, by{" "}
        <a
          href="https://github.com/AliNisarAhmed"
          className="
            text-blue-700
            hover:underline
          "
        >
          Ali Ahmed
        </a>
      </p>
    </footer>
  );
}

export default Footer;

import { NumberFormatProps } from "react-number-format";

interface Props {
  type: "networth" | "assets" | "liabilities";
  value: string;
  otherProps?: NumberFormatProps;
}

function MoneyText({ type, value, otherProps }: Props) {
  let baseClasses =
    "sm:absolute lg:relative w-full sm:max-w-full lg:w-min text-2xl tracking-wide lg:mt-2";

  switch (type) {
    case "networth":
      return (
        <p
          className={`${baseClasses} text-4xl ${otherProps?.className} lg:inline-block`}
        >
          {value}
        </p>
      );
    case "assets":
      return (
        <p className={`${baseClasses} text-green-500 lg:text-3xl`}>{value}</p>
      );
    default:
      return (
        <p className={`${baseClasses} text-red-500 lg:text-3xl`}>{value}</p>
      );
  }
}

export default MoneyText;

import { NumberFormatProps } from "react-number-format";

interface Props {
  type: "networth" | "assets" | "liabilities";
  value: string;
  otherProps?: NumberFormatProps;
}

function MoneyText({ type, value, otherProps }: Props) {
  let baseClasses = "absolute w-full max-w-full text-2xl tracking-wide mt-2";

  if (type === "networth") {
    return (
      <p className={`${baseClasses} text-3xl ${otherProps?.className}`}>
        {value}
      </p>
    );
  } else if (type === "assets") {
    return <p className={`${baseClasses} text-green-500`}>{value}</p>;
  } else {
    return <p className={`${baseClasses} text-red-500`}>{value}</p>;
  }
}

export default MoneyText;

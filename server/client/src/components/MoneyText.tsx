import { NumberFormatProps } from "react-number-format";

interface Props {
  type: "networth" | "assets" | "liabilities";
  value: string;
  otherProps?: NumberFormatProps;
  testId: string;
}

function MoneyText({ type, value, otherProps, testId }: Props) {
  let baseClasses =
    "text-2xl tracking-wide lg:my-1 lg:mr-4";

  switch (type) {
    case "networth":
      return (
        <p
          data-testid={testId}
          className={`${baseClasses} text-4xl ${otherProps?.className} lg:inline-block`}
        >
          {value}
        </p>
      );
    case "assets":
      return (
        <p
          data-testid={testId}
          className={`${baseClasses} text-green-500 lg:text-3xl`}
        >
          {value}
        </p>
      );
    default:
      return (
        <p
          data-testid={testId}
          className={`${baseClasses} text-red-500 lg:text-3xl`}
        >
          {value}
        </p>
      );
  }
}

export default MoneyText;

import { useFormContext } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { calculateNetWorth, getCurrencySymbol } from "../utils";
import MoneyText from "./MoneyText";

const NetWorth = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");
  const liabilities = watch("liabilities");
  const currency = watch("currency");
  const netWorth = calculateNetWorth(assets, liabilities);

  return (
    <div
      className="
      relative 
      sm:block
      lg:inline-block 
      h-24 w-full 
      my-4
      lg:my-8
      overflow-auto 
      lg:flex 
      lg:flex-row 
      lg:justify-center
      lg:items-baseline
      whitespace-nowrap
      overflow-x-auto
    "
    >
      <p className="inline-block lg:text-2xl lg:mr-4">Net Worth: </p>
      <NumberFormat
        defaultValue={0}
        thousandSeparator=","
        prefix={getCurrencySymbol(currency)}
        allowNegative={false}
        allowLeadingZeros={false}
        displayType="text"
        type="text"
        value={netWorth}
        decimalScale={2}
        // @ts-ignore
        renderText={(val: string, props: NumberFormatProps) => (
          <MoneyText value={val} type="networth" otherProps={props} />
        )}
        fixedDecimalScale
        className={`tracking-wider ${
          Number(netWorth) >= 0 ? "text-green-500" : "text-red-500"
        }`}
        currency={currency}
      />
    </div>
  );
};

export default NetWorth;

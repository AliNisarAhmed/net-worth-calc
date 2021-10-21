import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";
import { calculateNetWorth, getCurrencySymbol } from "../utils";

const NetWorth = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");
  const liabilities = watch("liabilities");
  const currency = watch('currency');
  const netWorth = calculateNetWorth(assets, liabilities);

  return (
    <div className="my-4">
      <p className="inline-block">Net Worth: </p>
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
        fixedDecimalScale
        className={`text-2xl ml-2 tracking-wider ${
          Number(netWorth) > 0 ? "text-green-500" : "text-red-500"
        }`}
      />
    </div>
  );
};

export default NetWorth;

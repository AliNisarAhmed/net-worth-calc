import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";
import { calculateNetWorth } from "../utils";

const NetWorth = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");
  const liabilities = watch("liabilities");

  return (
    <div>
      Net Worth:{" "}
      <NumberFormat
        defaultValue={0}
        thousandSeparator=","
        allowNegative={false}
        allowLeadingZeros={false}
        displayType="text"
        type="text"
        value={calculateNetWorth(assets, liabilities)}
        decimalScale={2}
        fixedDecimalScale
      />
    </div>
  );
};

export default NetWorth;

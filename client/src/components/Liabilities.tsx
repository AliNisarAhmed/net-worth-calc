import { Liability } from "../types";
import LineItems from "./LineItems";
import { calculateTotalLiabilities } from "../utils";
import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

const Liabilities = () => {
  const { watch } = useFormContext();
  const liabilities = watch("liabilities");
  return (
    <div className="my-4">
      <div className="border-black-600 border-b-4 border-double">
        <h2 className="text-xl text-red-500">Liabilities</h2>
      </div>
      <LineItems header="Short Term Liabilities" name="liabilities.shortTerm" />
      <LineItems header="Long Term Liabilities" name="liabilities.longTerm" />
      <TotalLiabilities liabilities={liabilities} />
    </div>
  );
};

export default Liabilities;

const TotalLiabilities = ({ liabilities }: { liabilities: Liability }) => {
  return (
    <div className="border-t-4 border-b-4 border-black-600 border-double py-4">
      <p className="inline-block">Total Liabilities: </p>
      <NumberFormat
        defaultValue={0}
        thousandSeparator=","
        allowNegative={false}
        allowLeadingZeros={false}
        displayType="text"
        type="text"
        value={calculateTotalLiabilities(liabilities)}
        decimalScale={2}
        fixedDecimalScale
        className="ml-2 text-xl text-red-500"
      />
    </div>
  );
};

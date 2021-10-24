import { Liability } from "../types";
import LineItems from "./LineItems";
import { getCurrencySymbol } from "../utils";
import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";
import MoneyText from "./MoneyText";
import SummaryText from "./layout/SummaryText";

const Liabilities = () => {
  const { watch } = useFormContext();
  const liabilities = watch("liabilities");
  return (
    <div className="mt-12">
      <div
        className="
        border-black-600 
        border-b-4 
        border-double
        "
      >
        <h2 className="text-2xl text-red-500">Liabilities</h2>
      </div>
      <fieldset>
        <legend className="sr-only">Short Term liabilities</legend>
        <LineItems
          header="Short Term Liabilities"
          name="liabilities.shortTerm"
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Long Term Liabilities</legend>
        <LineItems header="Long Term Liabilities" name="liabilities.longTerm" />
      </fieldset>
      <TotalLiabilities liabilities={liabilities} />
    </div>
  );
};

export default Liabilities;

const TotalLiabilities = ({ liabilities }: { liabilities: Liability }) => {
  const { watch } = useFormContext();
  const currency = watch("currency");

  return (
    <SummaryText>
      <p
        className="
        inline-block
        lg:text-xl
        lg:mr-4
      "
      >
        Total Liabilities:{" "}
      </p>
      <NumberFormat
        defaultValue={0}
        thousandSeparator=","
        prefix={getCurrencySymbol(currency)}
        allowNegative={false}
        allowLeadingZeros={false}
        displayType="text"
        type="text"
        value={liabilities.totalLiabilities}
        decimalScale={2}
        fixedDecimalScale
        renderText={(val: string) => (
          <MoneyText value={val} type="liabilities" />
        )}
      />
    </SummaryText>
  );
};

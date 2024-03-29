import { Asset } from "../types";
import LineItems from "../components/LineItems";
import { getCurrencySymbol } from "../utils";
import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";
import MoneyText from "./MoneyText";
import SummaryText from "./layout/SummaryText";
import { strings } from "../strings";

const Assets = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");

  return (
    <div className="my-4">
      <div
        className="
        border-black-700 
        border-b-4 
        border-double
        "
      >
        <h2
          className="
          lg:text-3xl 
          sm:text-2xl
          text-green-600 
          mb-2
          capitalize
          "
        >
          {strings.assets.main}
        </h2>
      </div>
      <fieldset>
        <legend className="sr-only">Cash And Investments</legend>
        <LineItems
          header="Cash And Investments"
          name="assets.cashAndInvestments"
        />
      </fieldset>
      <fieldset>
        <legend className="sr-only">Long Term Assets</legend>
        <LineItems header="Long Term Assets" name="assets.longTermAssets" />
      </fieldset>
      <TotalAssets assets={assets} />
    </div>
  );
};

export default Assets;

const TotalAssets = ({ assets }: { assets: Asset }) => {
  const { watch } = useFormContext();
  const currency = watch("currency");

  return (
    <SummaryText>
      <p
        className="
        lg:text-xl
        lg:mr-4
      "
      >
        Total Assets:{" "}
      </p>
      <NumberFormat
        defaultValue={0}
        thousandSeparator=","
        prefix={getCurrencySymbol(currency)}
        allowNegative={false}
        allowLeadingZeros={false}
        displayType="text"
        type="text"
        renderText={(val: string) => (
          <MoneyText testId="totalAssets" value={val} type="assets" />
        )}
        value={assets.totalAssets}
        decimalScale={2}
        fixedDecimalScale
      />
    </SummaryText>
  );
};

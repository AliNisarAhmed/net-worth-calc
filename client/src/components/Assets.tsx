import { Asset } from "../types";
import LineItems from "../components/LineItems";
import { calculateTotalAssets, getCurrencySymbol } from "../utils";
import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";
import MoneyText from "./MoneyText";
import SummaryText from "./layout/SummaryText";

const Assets = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");

  return (
    <div className="my-4">
      <div className="border-black-700 border-b-4 border-double">
        <h2 className="text-2xl text-green-500 mb-2">Assets</h2>
      </div>
      <LineItems
        header="Cash And Investments"
        name="assets.cashAndInvestments"
      />
      <LineItems header="Long Term Assets" name="assets.longTermAssets" />
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
        inline-block
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
        renderText={(val: string) => <MoneyText value={val} type="assets" />}
        value={calculateTotalAssets(assets)}
        decimalScale={2}
        fixedDecimalScale
      />
    </SummaryText>
  );
};

import { Asset } from "../types";
import LineItems from "../components/LineItems";
import { calculateTotalAssets } from "../utils";
import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

const Assets = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");
  return (
    <div className="my-4">
      <div className="border-black-600 border-b-4 border-double">
        <h2 className="text-xl text-green-500">
          Assets
        </h2>
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
  return (
    <div className="border-t-4 border-b-4 border-black-600 border-double py-4">
      <p className="inline-block">Total Assets: </p>
      <NumberFormat
        defaultValue={0}
        thousandSeparator=","
        allowNegative={false}
        allowLeadingZeros={false}
        displayType="text"
        type="text"
        value={calculateTotalAssets(assets)}
        decimalScale={2}
        fixedDecimalScale
        className="ml-2 text-xl text-green-500"
      />
    </div>
  );
};

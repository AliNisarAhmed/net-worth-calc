import { Asset } from "../types";
import LineItems from "../components/LineItems";
import { calculateTotalAssets } from "../utils";
import { useFormContext } from "react-hook-form";

const Assets = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");
  return (
    <div>
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
  return <div>Total Assets: {calculateTotalAssets(assets)}</div>;
};

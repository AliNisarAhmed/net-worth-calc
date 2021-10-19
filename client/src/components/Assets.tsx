import React from "react";
import { Asset } from "../types";
import LineItems from "../components/LineItems";
import { calculateTotalAssets } from "../utils";

interface Props {
  assets: Asset;
}

const Assets = ({ assets }: Props) => {
  return (
    <div>
      <LineItems
        items={assets.cashAndInvestments}
        header="Cash And Investments"
        name="cashAndInvestments"
      />
      <LineItems
        items={assets.longTermAssets}
        header="Long Term Assets"
        name="longTermAssets"
      />
      <TotalAssets assets={assets} />
    </div>
  );
};

export default Assets;

const TotalAssets = ({ assets }: { assets: Asset }) => {
  return <div>Total Assets: {calculateTotalAssets(assets)}</div>;
};

import React from "react";
import { Liability } from "../types";
import LineItems from "./LineItems";
import { calculateTotalLiabilities } from "../utils";

interface Props {
  liabilities: Liability;
}
const Liabilities = ({ liabilities }: Props) => {
  return (
    <div>
      <LineItems
        items={liabilities.shortTerm}
        header="Short Term Liabilities"
      />
      <LineItems items={liabilities.longTerm} header="Long Term Liabilities" />
      <TotalLiabilities liabilities={liabilities} />
    </div>
  );
};

export default Liabilities;

const TotalLiabilities = ({ liabilities }: { liabilities: Liability }) => {
  return <div>Total Liabilities: {calculateTotalLiabilities(liabilities)}</div>;
};

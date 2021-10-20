import { Liability } from "../types";
import LineItems from "./LineItems";
import { calculateTotalLiabilities } from "../utils";
import { useFormContext } from "react-hook-form";

const Liabilities = () => {
  const { watch } = useFormContext();
  const liabilities = watch("liabilities");
  return (
    <div>
      <LineItems header="Short Term Liabilities" name="liabilities.shortTerm" />
      <LineItems header="Long Term Liabilities" name="liabilities.longTerm" />
      <TotalLiabilities liabilities={liabilities} />
    </div>
  );
};

export default Liabilities;

const TotalLiabilities = ({ liabilities }: { liabilities: Liability }) => {
  return <div>Total Liabilities: {calculateTotalLiabilities(liabilities)}</div>;
};

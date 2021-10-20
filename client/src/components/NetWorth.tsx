import { useFormContext } from "react-hook-form";
import { calculateNetWorth } from "../utils";

const NetWorth = () => {
  const { watch } = useFormContext();
  const assets = watch("assets");
  const liabilities = watch("liabilities");

  return <div>Net Worth: {calculateNetWorth(assets, liabilities)}</div>;
};

export default NetWorth;

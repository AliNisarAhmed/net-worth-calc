import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { CollapseState } from "../types";

interface Props {
  collapseState: CollapseState;
  onClick: (e: any) => void;
}

function CollapseIcon({ collapseState, onClick }: Props) {
  return (
    <button aria-label="Collapse Section" onClick={onClick}>
      {collapseState === "collapsed" ? (
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      ) : (
        <ChevronUpIcon className="h-5 w-5 text-gray-400" />
      )}
    </button>
  );
}

export default CollapseIcon;

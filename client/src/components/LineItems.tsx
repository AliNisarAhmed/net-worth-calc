import React from "react";
import { LineItem } from "../types";

interface Props {
  items: LineItem[];
  header: string;
}

const LineItems = ({ items, header }: Props) => {
  return (
    <div>
      <h2>{header}</h2>
      {items.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
};

const Item = ({ item }: { item: LineItem }) => {
  return <div>{item.label}</div>;
};

export default LineItems;

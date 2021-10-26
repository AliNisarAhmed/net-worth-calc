interface Props {
  children: React.ReactNode;
}
function SummaryText({ children }: Props) {
  return (
    <div
      className="
      inline-block 
      w-full
      h-24
      border-t-4 border-b-4 border-black-600 border-double 
      my-4
      flex
      justify-center
      lg:h-18
      "
    >
      <div
        className="
        w-full
        flex
        flex-col
        justify-center
        items-end
        overflow-auto
        h-full
        lg:w-10/12
      "
      >
        {children}
      </div>
    </div>
  );
}

export default SummaryText;

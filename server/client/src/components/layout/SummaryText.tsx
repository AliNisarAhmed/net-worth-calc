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
      py-4 
      my-4
      flex
      justify-center
      lg:h-22
      "
    >
      <div
        className="
        sm:absolute
        lg:relative
        w-full
        lg:flex
        lg:flex-row
        lg:justify-end
        lg:items-baseline
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

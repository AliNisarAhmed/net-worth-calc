interface Props {
  children: React.ReactNode;
}
function SummaryText({ children }: Props) {
  return (
    <div
      className="
      relative 
      inline-block 
      w-full
      h-24
      min-w-full max-w-full 
      border-t-4 border-b-4 border-black-600 border-double 
      py-4 
      overflow-x-auto"
    >
      {children}
    </div>
  );
}

export default SummaryText;

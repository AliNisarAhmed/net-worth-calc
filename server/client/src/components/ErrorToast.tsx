import { ExclamationCircleIcon } from "@heroicons/react/outline";

interface Props {
  message: string;
}

function ErrorToast({ message = "An Error occurred" }: Props) {
  return (
    <div className="flex flex-row justify-start items-center">
      <div className="h-full w-5 mr-2">
        <ExclamationCircleIcon className="text-red-500 h-5 w-5 lg:mr-4 sm:mr-2" />
      </div>
      <p className="text-black-900">{message}</p>
    </div>
  );
}

export default ErrorToast;

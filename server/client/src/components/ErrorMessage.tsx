import { ErrorMessage } from "@hookform/error-message";

interface Props {
  name: string;
  errors: { [x: string]: any };
}

function ErrorMessageWrapper({ name, errors }: Props) {

  return (
    <div className="h-1/6 sm:max-w-30 pt-1">
      <ErrorMessage
        name={name}
        errors={errors}
        render={() => (
          <p className="inline-block italic text-red-500 sm:mt-2">
            Number is too big for our calculators!
          </p>
        )}
      />
    </div>
  );
}

export default ErrorMessageWrapper;

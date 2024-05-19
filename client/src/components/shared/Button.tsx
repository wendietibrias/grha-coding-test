import LoadingSpinner from "./LoadingSpinner";

type ButtonAuthProps = {
  title: string;
  isDisabled: boolean;
};

const Button = ({ title, isDisabled = false }: ButtonAuthProps) => {
  return (
    <button
      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
      disabled={isDisabled}
      className={`button-item mt-2 ${isDisabled}`}
    >
      {isDisabled ? <LoadingSpinner width={16} height={16} color="#fff"/> : title}
    </button>
  );
};

export default Button;

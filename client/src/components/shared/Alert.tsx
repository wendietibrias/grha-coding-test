import useAlert, { IUseAlert } from "../../hooks/useAlert";

const Alert = () => {
  const { type, message } = useAlert() as IUseAlert;

  return (
    <div className={`alert-container ${type}`}>
      <div className="alert-message-container">
        {Array.isArray(message) ? (
          <ul className="error-items">
            {message.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Alert;

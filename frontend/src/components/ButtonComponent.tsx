export default function ButtonComponent(props: {
  className?: string;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}) {
  const { onClick, label } = props;

  const buttonStyle =
    "p-2 border rounded-[4px] hover:bg-blue-200 disabled:bg-gray-500 " +
    props.className;

  return (
    <button className={buttonStyle} disabled={props.disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export default function ButtonComponent(props: {
  className?: string;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}) {
  const { onClick, label } = props;

  const buttonStyle =
    "transition-colors p-2 border rounded-[4px] hover:bg-blue-100 active:bg-blue-300 disabled:bg-gray-500 " +
    props.className;

  return (
    <button className={buttonStyle} disabled={props.disabled} onClick={onClick}>
      {label}
    </button>
  );
}

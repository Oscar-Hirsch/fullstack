export default function ButtonComponent(props: {
  className?: string;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}) {
  const { onClick, label } = props;

  const className =
    "transition-colors p-2 border rounded-[4px] hover:bg-blue-100 active:bg-blue-300 disabled:bg-gray-400 disabled:border-transparent disabled:text-gray-700 disabled:shadow-none shadow" +
    " " +
    props.className;

  return (
    <button className={className} disabled={props.disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export default function ButtonComponent(props: {
  className?: string;
  onClick: () => void;
  label: string;
}) {
  const { onClick, label } = props;

  return (
    <button
      className="p-2 border rounded-[4px] hover:bg-blue-200"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

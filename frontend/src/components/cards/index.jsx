export default function Card({ header, body }) {
  return (
    <div className="bg-white shadow-md px-5 py-3 rounded-[30px] flex flex-col">
      <div className="my-2 text-lg font-semibold">{header}</div>
      <div className="flex-1">{body}</div>
    </div>
  );
}
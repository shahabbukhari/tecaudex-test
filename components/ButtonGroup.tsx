export default function ButtonGroup({ list }: { list: string[] }) {
  return (
    <div className="inline-flex border rounded-md " role="group">
      {list.map((item, index) => (
        <button
          type="button"
          className={`inline-flex items-center px-6 py-3 text-sm text-buttonGray  bg-primaryLight  
            ${index === 0 && " rounded-l-md "}
            ${index === list.length - 1 && " rounded-r-md "}
           focus:z-10 focus:bg-primary focus:text-white text-lg`}
          key={index}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

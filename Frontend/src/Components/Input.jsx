export function Input({onChange,placeholder,reference}){
    return <div>
        <input ref={reference} type={"text"} className="px-4 py-2 text-gray-500  font-normal bg-slate-50 border rounded min-w-56  my-2 focus:outline-none" onChange={onChange} placeholder={placeholder}></input>
    </div>
}
export function Input({onChange,placeholder,reference}){
    return <div>
        <input ref={reference} type={"text"} className="px-4 py-2 text-gray-500 text-sm md:text-md  font-normal bg-slate-50 border rounded min-w-38 max-w-46  my-2 focus:outline-none" onChange={onChange} placeholder={placeholder}></input>
    </div>
}
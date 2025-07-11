import { useState } from "react";
import { IconEye,IconEyeClosed,IconSearch } from '@tabler/icons-react';

export function Input({ label, type = 'text', value, onChange,name,extraClass = "" }) {
  return (
    <div className="flex flex-col w-full ">
      <label className="font-semibold text-[14px] ml-3">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      className={`px-3 py-3 border border-gray-300 rounded-[15px] text-md ${extraClass}`}
      
      />
    </div>
  );
}




export function PasswordInput({ label, value, onChange,showIcon = false,name}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col w-full relative">
      <label className="font-semibold text-[14px] ml-3">{label}</label>
      <input
        type={show ? "text" : "password"}
        value={value}
          name={name}
        onChange={onChange}
        
        className="px-3 py-3 border border-gray-300 rounded-[15px] pr-10"
      />
      {showIcon &&(<button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-[65%] transform cursor-pointer  -translate-y-1/2 text-sm text-slate-500"
      >
        {!show ? <IconEye /> : <IconEyeClosed/>}
      </button>)}
    </div>
  );
}




export function Search({ type = "text", name, extraClass = "" }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="flex flex-col w-full relative">
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`px-10 py-3 border border-gray-200 rounded-[15px] text-md ${extraClass}`}
      />

      {value === "" && !isFocused && (
        <div className="absolute left-4 top-[50%] transform -translate-y-1/2 text-sm text-slate-500 flex items-center gap-2 pointer-events-none">
          <IconSearch size={18} />
          <span>Search</span>
        </div>
      )}
    </div>
  );
}


export function TextArea({ name, value, onChange, rows = 4, extraClass = "",label }) {
  return (
        <div className="flex flex-col w-full ">
      <label className="font-semibold text-[14px] ml-3">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
    
      className={`px-4 py-3 border border-gray-200 rounded-[15px] text-md resize-none w-full ${extraClass}`}
    />
    </div>
  );
}

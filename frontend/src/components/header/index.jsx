import { Search } from "../inputs";

export function Header() {
  return (
    <header className="bg-white shadow-md p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-[1.5rem] w-[1.5rem] rounded-[40px] bg-red-500 text-white">
            <span className="font-bold text-[12px]">P</span>
          </div>
          <h1 className="text-xl font-bold text-red-500 text-shadow-2xs">
            Pinterest
          </h1>
          <div className="text-[12px] text-red-500 font-bold glow-red">
            clone
          </div>
        </div>

        <nav>
          <a className="text-gray-700 hover:text-red-500 mr-4">Login</a>
          <a className="text-gray-700 hover:text-red-500">Sign up</a>
        </nav>
      </div>
    </header>
  );
}

export function AuthHeader (){
  return(
  <header className="p-4">
    <Search extraClass="bg-gray-200"></Search>
    
  </header>
  );

}
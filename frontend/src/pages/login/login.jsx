import { useState } from "react";
import bglogin from "../../assets/images/bg_login.png";
import Card from "../../components/cards";
import LoginForm from "./partials/loginForm";
import RegisterForm from "./partials/registerForm";

export default function Login() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div
      className="w-full  relative bg-cover bg-center flex justify-evenly"
      style={{
        backgroundImage: `url(${bglogin})`,
      }}
    >
      {/* Overlay for brightness/darkness */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Content above overlay */}
      <div className=" relative z-10  lg:w-[70%]">
        <div className="flex justify-center md:justify-between h-full  items-center">
          <div className="w-[40rem] hidden md:block">
            <div className="text-[70px] font-extrabold text-white">
              <div>Login to discover</div>
              <div> inspiration</div>
            </div>
          </div>
          <div className="w-[30rem] md:w-[30rem]">
            <Card
              header={
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <div className="rounded-[50px] bg-red-500 text-white h-[3rem] w-[3rem] flex items-center justify-center shadow-md">
                      <span className="font-bold text-[24px]">P</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center font-bold">
                    <div className="text-[28px] leading-tight ">Welcome to</div>
                    <div className="text-[28px] leading-tight ">Pinterest</div>
                    {!signUp && (
                      <div className="text-[16px] pt-2 font-medium text-gray-400">
                        Find your ideas to try
                      </div>
                    )}
                  </div>
                </div>
              }
              body={
                <div className=" flex flex-col  items-center p-2">
                  {!signUp ? (
                    <LoginForm setSignUp={setSignUp}></LoginForm>
                  ) : (
                    <RegisterForm setSignUp={setSignUp}></RegisterForm>
                  )}
                </div>
              }
            ></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

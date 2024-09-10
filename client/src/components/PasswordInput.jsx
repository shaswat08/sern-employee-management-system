import React, { useState } from "react";

const PasswordInput = ({ eye: Eye, slash: Slash }) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-md font-semibold" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <input
          className="py-2 pl-5 w-full bg-red-200 rounded outline-none text-sm"
          type={visibility ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          {visibility ? (
            <Eye
              className="cursor-pointer"
              onClick={() => setVisibility(!visibility)}
            />
          ) : (
            <Slash
              className="cursor-pointer"
              onClick={() => setVisibility(!visibility)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;

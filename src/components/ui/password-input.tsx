import * as React from "react";

import { Input } from "./input";
import { FiEye, FiEyeOff } from "react-icons/fi";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        type={showPassword ? "text" : "password"}
        suffix={
          showPassword ? (
            <FiEye
              className="select-none relative left-[290px] bottom-[26px]"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FiEyeOff
              className="select-none relative left-[290px] bottom-[26px]"
              onClick={() => setShowPassword(!showPassword)}
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

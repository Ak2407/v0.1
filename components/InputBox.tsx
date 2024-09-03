"use client";
import React, { useState, useEffect, forwardRef } from "react";
import { Paperclip, ArrowUp, Spinner, Pause } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

type InputBoxProps = {
  placeholder: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  inputDisabled?: boolean;
  isLoading?: boolean;
  onStop?: () => void;
};

const InputBox = forwardRef<HTMLTextAreaElement, InputBoxProps>(
  (
    {
      placeholder,
      handleSubmit,
      handleInputChange,
      value,
      onKeyDown,
      inputDisabled,
      isLoading,
      onStop,
    },
    ref,
  ) => {
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        setDisabled(value.trim().length === 0);
        ref.current.style.height = "auto";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    }, [value, ref]);

    return (
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="has-[:focus-visible]:border-gray-400 border-[0.5px] relative rounded-xl border-gray-300 bg-white shadow transition-colors duration-300 ease-in"
        >
          <div className="relative z-10 grid rounded-xl bg-white">
            <textarea
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              ref={ref}
              value={value}
              onChange={handleInputChange}
              autoFocus
              disabled={inputDisabled}
              rows={1}
              className="resize-none overflow-auto min-h-[42px] h-[42px] max-h-[384px] outline-none ring-0 text-sm bg-transparent p-3 pb-1.5 w-full placeholder-gray-400 font-light"
            />
            <div className="flex items-center justify-end p-3">
              {/* <Button variant="outline" className="p-2 roundex-2xl" size="sm"> */}
              {/*   <Paperclip size={15} /> */}
              {/* </Button> */}

              {isLoading ? (
                <Button
                  className="flex gap-1 rounded-lg transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-600 disabled:border-gray-400 disabled:border"
                  onClick={onStop}
                >
                  <Pause size={17} weight="bold" />
                  <h1>Stop</h1>
                </Button>
              ) : (
                <Button
                  disabled={disabled || inputDisabled}
                  className="flex gap-1 rounded-lg transition-all duration-300 disabled:bg-gray-200 disabled:text-gray-600 disabled:border-gray-400 disabled:border"
                >
                  {inputDisabled ? (
                    <Spinner size={15} weight="bold" className="animate-spin" />
                  ) : (
                    <>
                      <ArrowUp size={17} weight="bold" />
                      <h1>Send</h1>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  },
);

InputBox.displayName = "InputBox";

export default InputBox;

import classNames from "classnames";
import React from "react";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const maxLineBeforeSizeChange = 3;

export const TextInput: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
}) => {
  const nbLines = value.split("\n").length;
  return (
    <>
      <textarea
        className={classNames("textarea textarea-bordered w-full", {
          "resize-none": nbLines <= maxLineBeforeSizeChange,
        })}
        placeholder={placeholder}
        value={value}
        rows={nbLines <= maxLineBeforeSizeChange ? 3 : 10}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

TextInput.defaultProps = {};

export default TextInput;

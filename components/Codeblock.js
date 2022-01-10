import React, { useState } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import styled from "styled-components";
import { HiOutlineClipboardCopy } from "react-icons/hi";

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  /* overflow: scroll; */
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const Codeblock = ({ children }) => {
  const {
    props: { children: source, className: languageClass },
  } = children;
  // const language = languageClass.replace(/language-/, "");

  const [clip, setClip] = useState(false);
  const handleClipboard = () => {
    copy(source);
    setClip(true);
    setTimeout(() => setClip(false), 400);
  };

  const copy = async (code) => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={source}
      language="javascript"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="relative">
          <Pre
            className={`${className} overflow-y-auto overflow-x-auto`}
            style={style}
          >
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
          <button
            onClick={handleClipboard}
            className="text-white  cursor-pointer absolute top-6 right-6 z-50 transition duration-300 hover:bg-gray-200 rounded-full hover:text-off-black p-1"
          >
            <HiOutlineClipboardCopy className="h-6 w-6">
              {clip ? "Copied" : "Copy"}
            </HiOutlineClipboardCopy>
          </button>
        </div>
      )}
    </Highlight>
  );
};

export default Codeblock;

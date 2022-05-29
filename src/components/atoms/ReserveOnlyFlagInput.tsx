import React from "react";
import styled from "styled-components";
import { Sbox, Slabel } from "./commonInputStyle";

type PropsType = {
  label: string;
  name: string;
  defaultChecked?: boolean;
  onClick: (e: any) => void;
};

export const ReserveOnlyFlagInput = (props: PropsType) => {
  const { label, name, defaultChecked, onClick } = props;
  return (
    <Sbox>
      <Slabel>{label}</Slabel>
      <input
        type="checkbox"
        defaultChecked={defaultChecked ?? false}
        name={name}
        onClick={onClick}
      />
    </Sbox>
  );
};

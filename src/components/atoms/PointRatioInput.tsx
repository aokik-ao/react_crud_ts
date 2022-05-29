import React from "react";
import styled from "styled-components";
import { Sbox, Slabel } from "./commonInputStyle";

type PropsType = {
  label: string;
  name: string;
  defaultChecked?: string;
  onChange: (e: any) => void;
};

export const PointRatioInput = (props: PropsType) => {
  const { label, name, defaultChecked, onChange } = props;
  return (
    <Sbox>
      <Slabel>{label}</Slabel>
      <div>
        <input
          type="radio"
          name={name}
          defaultChecked={defaultChecked === "5" ? true : false}
          value="5"
          onChange={onChange}
          id="point-ratio-5"
        />
        <label htmlFor="point-ratio-5" style={{ marginRight: "16px" }}>
          5%
        </label>
        <input
          type="radio"
          name={name}
          defaultChecked={defaultChecked === "10" ? true : false}
          value="10"
          onChange={onChange}
          id="point-ratio-10"
        />
        <label htmlFor="point-ratio-10">10%</label>
      </div>
    </Sbox>
  );
};

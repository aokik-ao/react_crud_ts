import React from "react";
import styled from "styled-components";

type PropsType = {
  label: string;
  name: string;
  defaultValue?: string;
  onBlur: (e: any) => void;
  unit: string;
  type: string;
};

export const TextInput = (props: PropsType) => {
  {
    const { label, name, defaultValue, onBlur, unit, type } = props;

    const Sbox = styled.div`
      margin-bottom: 16px;
    `;

    const Slabel = styled.div`
      width: 160px;
      margin-right: 8px;
    `;

    return (
      <Sbox>
        <Slabel>{label}</Slabel>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          onBlur={onBlur}
        />
        {unit}
      </Sbox>
    );
  }
};

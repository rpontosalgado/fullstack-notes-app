import styled from 'styled-components';

const Svg = styled.svg`
  width: 55px;
  height: auto;
`;

export const LogoIcon = () => {
  return (
    <Svg
      viewBox="0 0 60 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="4" width="28" height="31" rx="3" fill="#d94343" />
      <path
        d="M13 15h8M13 20h8M13 25h5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="43" cy="21" r="13" fill="#b83232" />
      <path
        d="M39 21l3 3 6-6"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};


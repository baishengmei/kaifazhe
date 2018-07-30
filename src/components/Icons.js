import React from 'react';
import { AppOsTypeZH as OsTypeMap } from '../constants/MenuTypes';

export default {
  [OsTypeMap[0].value]: (
    <svg
      width="16"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <circle stroke="currentColor" cx="8" cy="8" r="7" />
        <path
          fill="currentColor"
          d="M8.38025717,11.3926947 C8.2760402,11.4969117 8.13588635,11.5418328 7.99932618,11.5346454 C7.86276602,11.5418328 7.72261216,11.4969117 7.61839519,11.3926947 L5.14689202,8.92119153 C4.95103599,8.7253355 4.95103599,8.40549722 5.14689202,8.20964119 C5.34274805,8.01378516 5.66258633,8.01378516 5.85844236,8.20964119 L7.49620978,9.84740861 L7.49620978,5.0031164 C7.49620978,4.72460554 7.72081532,4.5 7.99932618,4.5 C8.27783705,4.5 8.50244259,4.72460554 8.50244259,5.0031164 L8.50244259,9.84740861 L10.14021,8.20964119 C10.336066,8.01378516 10.6559043,8.01378516 10.8517603,8.20964119 C11.0494132,8.40729406 11.0494132,8.7253355 10.8517603,8.92119153 L8.38025717,11.3926947 Z"
        />
      </g>
    </svg>
  ),
  [OsTypeMap[1].value]: (
    <svg
      width="16"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <circle stroke="currentColor" cx="8" cy="8" r="7" />
        <g transform="translate(3, 3)" stroke="currentColor">
          <rect
            transform="translate(6.5, 4.579694) rotate(65) translate(-6.5, -4.579694) "
            x="2.5"
            y="4.57969413"
            width="8"
            height="1"
            rx="0.5"
          />
          <rect
            transform="translate(3, 5.938076) scale(-1, 1) rotate(65) translate(-3, -5.938076) "
            x="0.5"
            y="5.93807636"
            width="5"
            height="1"
            rx="0.5"
          />
          <rect x="0.5" y="5.5" width="9" height="1" rx="0.5" />
        </g>
      </g>
    </svg>
  ),
};

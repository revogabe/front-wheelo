import { SVGProps } from 'react'

export function CarIcons(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6 19v.525q0 .625-.425 1.05T4.5 21q-.625 0-1.063-.438T3 19.5V12l2.1-6q.15-.45.537-.725T6.5 5h11q.475 0 .863.275T18.9 6l2.1 6v7.525q0 .625-.425 1.05T19.5 21q-.625 0-1.062-.438T18 19.5V19H6Zm-.2-9h12.4l-1.05-3H6.85L5.8 10Zm1.7 6q.625 0 1.063-.438T9 14.5q0-.625-.438-1.063T7.5 13q-.625 0-1.063.438T6 14.5q0 .625.438 1.063T7.5 16Zm9 0q.625 0 1.063-.438T18 14.5q0-.625-.438-1.063T16.5 13q-.625 0-1.063.438T15 14.5q0 .625.438 1.063T16.5 16Z"
      ></path>
    </svg>
  )
}

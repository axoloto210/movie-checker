type Props = {
  color: string
  width: string
  height: string
}

export function RankIcon(props: Props) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="10,170 10,50 70,120 100,50 130,120 190,50 190,170"
        fill={props.color}
        stroke="black"
        strokeWidth="5"
      />
      <rect
        x="10"
        y="170"
        width="180"
        height="20"
        fill={props.color}
        stroke="black"
        strokeWidth="5"
      />
      <circle
        cx="10"
        cy="40"
        r="10"
        fill={props.color}
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx="190"
        cy="40"
        r="10"
        fill={props.color}
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="40"
        r="10"
        fill={props.color}
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}

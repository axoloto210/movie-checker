type Props = {
  order: number
  width: string
  height: string
}

const getRankIconColor = (order: number) => {
  switch (order) {
    case 0:
      return 'gold'
    case 1:
      return 'silver'
    case 2:
      return 'brown'
    default:
      return 'gray'
  }
}

export function RankIcon(props: Props) {
  const color = getRankIconColor(props.order)
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="10,170 10,50 70,120 100,50 130,120 190,50 190,170"
        fill={color}
        stroke="black"
        strokeWidth="0"
      />
      <rect
        x="10"
        y="170"
        width="180"
        height="20"
        fill={color}
        stroke="black"
        strokeWidth="0"
      />
      <circle
        cx="10"
        cy="40"
        r="10"
        fill={color}
        stroke="black"
        strokeWidth="0"
      />
      <circle
        cx="190"
        cy="40"
        r="10"
        fill={color}
        stroke="black"
        strokeWidth="0"
      />
      <circle
        cx="100"
        cy="40"
        r="10"
        fill={color}
        stroke="black"
        strokeWidth="0"
      />
    </svg>
  )
}

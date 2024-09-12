type Props = {
  path: string;
  fill?: string;
  size?: string;
  width?: string;
  height?: string;
};

function Svg({ path, fill, size, width, height }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={size || width || '24px'}
      width={size || height || '24px'}
      fill={fill || '#5f6368'}>
      <path d={path} />
    </svg>
  );
}

export default Svg;

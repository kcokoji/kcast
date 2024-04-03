interface SpinnerProps {
  width: number;
  height: number;
}
export default function Spinner({ width, height }: SpinnerProps) {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  };
  return <div className="spinner" style={style}></div>;
}

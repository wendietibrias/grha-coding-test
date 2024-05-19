import ReactLoading from "react-loading";

type LoadingSpinnerProps = {
    width:number;
    height:number;
    color:string;
}

const LoadingSpinner = ({ width,height,color }: LoadingSpinnerProps) => {
   return (
      <ReactLoading width={width} height={height} type="spin" color={color} />
   )
}
export default LoadingSpinner;
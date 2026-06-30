import Image from "next/image";
import Vision from "@/src/public/vision.png";
import unVision from "@/src/public/unvision.png";
import { Dispatch, FC, SetStateAction } from "react";

type PropsType = {
    setIsShownPassword: Dispatch<SetStateAction<boolean>>,
    isShownPassword: boolean
}

const PasswordVisibilityToggle: FC<PropsType> = ({setIsShownPassword, isShownPassword}) => {
  return <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center cursor-pointer hover:opacity-70 transition-opacity">
      <Image src={Vision} alt={"Показати пароль"} height={25} width={25} onClick={() => {
          setIsShownPassword(true)
      }} style={{display: !isShownPassword ? 'block' : 'none'}}/>
      <Image src={unVision} alt={"Приховати пароль"} height={25} width={25} onClick={() => setIsShownPassword(false)} style={{display: isShownPassword ? 'block' : 'none'}}/>
  </div>;
};

export default PasswordVisibilityToggle;

'use client'
import { Input } from "@heroui/react";
import { FC, useEffect, useState } from "react";
import {useURL} from "@/src/hooks/shared/useURL";

type PropsType = {
  currentLimit?: number
}

const Limit: FC<PropsType> = ({currentLimit = 5}) => {
  const [inputLimitValue, setInputLimitValue] = useState<string | undefined>(undefined)
  const {router, pathname, createQueryString} = useURL()
  useEffect(() => {
      if(inputLimitValue){
        const timer = setTimeout(() => router.push(pathname + '?' + createQueryString('limit', inputLimitValue)), 500)
        return () => clearTimeout(timer)
      }
  }, [inputLimitValue]);
  return <div className="flex items-center gap-3">
    <p className="text-sm">К-сть: </p>
    <Input value={inputLimitValue ?? currentLimit} type='text' className="w-[40px] h-[30px]" onChange={(e) => setInputLimitValue(e.target.value)}/>
  </div>;
};

export default Limit;

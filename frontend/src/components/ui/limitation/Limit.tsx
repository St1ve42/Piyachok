'use client'
import { Input } from "@heroui/react";
import { FC, useEffect, useState } from "react";
import {useURL} from "@/src/hooks/shared/useURL";

type PropsType = {
  currentLimit: number
}

const Limit: FC<PropsType> = ({currentLimit}) => {
  const [inputLimitValue, setInputLimitValue] = useState<string>(currentLimit.toString())
  useEffect(() => {
    setInputLimitValue(currentLimit.toString())
  }, [currentLimit]);
  const {router, pathname, createQueryString} = useURL()
  useEffect(() => {
    const timer = setTimeout(() => router.push(pathname + '?' + createQueryString('limit', inputLimitValue)), 500)
    return () => clearTimeout(timer)
  }, [inputLimitValue]);
  return <div className="flex items-center gap-[3px]">
    <p className="text-sm">Брати по: </p>
    <Input value={inputLimitValue} type='text' className="w-[40px] h-[30px]" onChange={(e) => setInputLimitValue(e.target.value)}/>
  </div>;
};

export default Limit;

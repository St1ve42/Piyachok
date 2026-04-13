import Image from "next/image";
import PageNotFound from "@/src/public/no-results.png"

export default function NotFound() {
    return (
        <section className="h-[80%] flex justify-center items-center gap-10 flex-col">
            <Image src={PageNotFound} width={150} height={150} alt={'Не знайдено'}/>
            <div className="w-[50%] text-[3rem]">
                404 Сторінку не знайдено
            </div>
        </section>
    )
}
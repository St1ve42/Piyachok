import Image from "next/image";
import PageNotFound from "@/src/public/no-results.png"
import Link from "next/link";

export default function NotFound() {
    return (
        <section className="h-[80%] w-full flex justify-center items-center gap-10 flex-col">
            <div className="w-[50%] flex justify-center items-center gap-10">
                <Image src={PageNotFound} width={100} height={100} alt={'Не знайдено'}/>
                <div className="w-[70%] text-[2rem]">
                    404 Сторінку не знайдено
                </div>
            </div>
            <Link href={'/'}>
                Повернутись на головну сторінку
            </Link>
        </section>
    )
}

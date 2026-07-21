'use client'

import { useEffect, useState } from "react";
import { Button, Card } from "@heroui/react";
import { ArrowLeft, Envelope } from "@gravity-ui/icons";
import Link from "next/link";
import {useEmailStore} from "@/src/hooks/shared/useSharedStore";
import {notFound} from "next/navigation";

const ConfirmRequestFoodAndDrinkEmailView = () => {
    const email = useEmailStore(({email}) => email)
    if(!email){
        notFound()
    }

    const [countdown, setCountdown] = useState<number>(60)

    const handleResend = () => {
        if(countdown === 0){
            setCountdown(60)
        }
    }

    useEffect(() => {
        if(countdown > 0){
            const timer = setTimeout(() => setCountdown(prevState => prevState - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-neutral-50/50">

            <Card className="max-w-md w-full p-8 flex flex-col items-center text-center shadow-md border border-neutral-100 bg-white rounded-3xl">

                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6 border border-amber-100">
                    <Envelope strokeWidth={1.5} />
                </div>

                <h1 className="text-2xl font-bold text-neutral-900 mb-3">
                    Майже готово! 🍻
                </h1>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    Ми надіслали лист для підтвердження на пошту
                    <span className="font-semibold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded-md break-all">
            {email}
          </span>
                    . Будь ласка, перевірте скриньку (та папку <span className="italic">Спам</span>) і перейдіть за посиланням, щоб активувати профіль закладу.
                </p>

                <div className="w-full flex flex-col gap-4">
                    <Button
                        size="lg"
                        className="w-full font-semibold rounded-xl text-sm"
                        isDisabled={countdown > 0}
                        onClick={handleResend}
                    >
                        {countdown > 0
                            ? `Надіслати знову через ${countdown}с`
                            : "Надіслати лист повторно"
                        }
                    </Button>

                    <Link
                        href="/auth/sign-in"
                        color="foreground"
                        className="text-xs justify-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors py-2 cursor-pointer"
                    >
                        <ArrowLeft/> Повернутися до входу
                    </Link>
                </div>

            </Card>
        </div>
    )
}

export default ConfirmRequestFoodAndDrinkEmailView
'use client'

import {useEffect} from "react";
import {Button, Heading} from "@heroui/react";

export default function GlobalError({ error, unstable_retry}: {
    error: Error & { digest?: string },
    unstable_retry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error]);
    return (
        <html>
            <body className="flex justify-center items-center">
                <div>
                    <Heading level={3}>Щось пішло не так!</Heading>
                    <Button onClick={() => unstable_retry()}>Спробуйте знову</Button>
                </div>
            </body>
        </html>
    )
}
'use client' // Error boundaries must be Client Components

import {useEffect} from "react";

export default function GlobalError({ error, unstable_retry}: {
    error: Error & { digest?: string },
    unstable_retry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error]);
    return (
        <html>
            <body>
                <h2>Щось пішло не так!</h2>
                <button onClick={() => unstable_retry()}>Спробуйте знову</button>
            </body>
        </html>
    )
}
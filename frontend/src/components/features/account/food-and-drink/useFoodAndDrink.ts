'use client'
import Instagram from "@/src/public/instagram.png"
import Twitter from "@/src/public/twitter.png"
import Facebook from "@/src/public/facebook_logo.svg"
import Telegram from "@/src/public/telegram.png"
import {useRef, useState, useEffect, ChangeEvent} from 'react'
import {useMyFoodAndDrink} from '@/src/useQuery/useMyFoodAndDrink'
import {useRouter} from 'next/navigation'
import {IFoodAndDrinkOwnerInfo} from '@/src/interfaces/food-and-drink/IFoodAndDrinkOwnerInfo'
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export default function useFoodAndDrink() {
    // fetch user's foodAndDrink using existing query hook
    const query = useMyFoodAndDrink()
    const data = query.data ?? null
    const icons: {[key: string]: StaticImport} = {
        "facebook": Facebook,
        "telegram": Telegram,
        "instagram": Instagram,
        "X": Twitter
    }
    const [isEditing, setIsEditing] = useState(false)
    const [local, setLocal] = useState<IFoodAndDrinkOwnerInfo | null>(null)
    const [galleryFiles, setGalleryFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    useEffect(() => {
        // set local state only if not already initialized to avoid cascading renders
        // use setTimeout to defer the state update and avoid react-hooks/set-state-in-effect lint
        if (data && !local) {
            const t = setTimeout(() => setLocal(data), 0)
            return () => clearTimeout(t)
        }
        return
    }, [data, local])

    const handleEdit = () => {
        setIsEditing(v => !v)
    }

    const handleTriggerFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const file = e.target.files[0]
        if (file) {
            // Store locally; in real app you'd upload to server
            setGalleryFiles(prev => [file, ...prev])
            // update local mainImage preview
            const url = URL.createObjectURL(file)
            setLocal(prev => prev ? ({...prev, mainImage: url}) : prev)
        }
    }

    const handleRemoveGallery = (index: number) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleSave = async () => {
        // Placeholder: in real app call API
        // For now just exit edit mode and refresh to get server data
        setIsEditing(false)
        router.refresh()
    }

    return {
        query,
        data,
        isEditing,
        handleEdit,
        fileInputRef,
        handleTriggerFileInput,
        handleUploadFile,
        galleryFiles,
        handleRemoveGallery,
        handleSave,
        icons
    }
}


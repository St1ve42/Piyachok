import {ChangeEvent, KeyboardEventHandler, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {ISchedule} from "@/src/components/shared/schedule/Schedule";

const useCreateFoodAndDrink = () => {
    const [schedules, setSchedules] = useState<ISchedule[]>([])
    const [galleryFiles, setGalleryFiles] = useState<File[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(galleryFiles.length < 10){
            if (!e.target.files) return
            const file = e.target.files[0]
            if (file) {
                setGalleryFiles(prev => [...prev, file])
            }
        }
    }
    const handleRemoveGallery = (index: number) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== index))
    }
    const handleTriggerFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }
    const handleAddDay = () => {
        if(schedules.length < 7){
            const newSchedule: ISchedule = {
                id: `schedule-${uuidv4()}`
            }
            setSchedules(prev => [...prev, newSchedule])
        }
    }

    const handleRemoveSchedule = (id: string) => {
        setSchedules(prev => prev.filter(schedule => schedule.id !== id))
    }

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim()
        if (trimmedTag && trimmedTag.length >= 3 && trimmedTag.length <= 50 && !tags.includes(trimmedTag) && tags.length < 10) {
            setTags(prev => [...prev, trimmedTag])
            setTagInput('')
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove))
    }

    const handleTagInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }
    return {schedules, galleryFiles, tags, tagInput, setTagInput, fileInputRef, handleUploadFile, handleRemoveGallery, handleTriggerFileInput, handleAddDay, handleRemoveSchedule, handleRemoveTag, handleAddTag, handleTagInputKeyDown}
}

export default useCreateFoodAndDrink
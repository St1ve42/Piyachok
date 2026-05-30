import {Checkbox, Label} from "@heroui/react";
import {useFeatures} from "@/src/tanstack-query-hooks/useFeatures";
import {FC} from "react";

type PropsType = {
    handleFeatureCheck: (feature: string) => ((isSelected: boolean) => void)
    isShownTextAboutOptional?: boolean
}

const FeatureSelection: FC<PropsType> = ({handleFeatureCheck, isShownTextAboutOptional = false}) => {
    const featuresQuery = useFeatures()
    if(featuresQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <div>
            <Label>Особливості {isShownTextAboutOptional && <span>(не обов'язково)</span>}</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
                {featuresQuery.data && featuresQuery.data.success && featuresQuery.data.data.map(feature => <div key={feature}>
                    <Checkbox id={feature} name={'features[]'} value={feature} onChange={handleFeatureCheck(feature)}>
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                            <Label htmlFor={feature}>{feature}</Label>
                        </Checkbox.Content>
                    </Checkbox>
                </div>)}
            </div>
        </div>
    )
}

export default FeatureSelection
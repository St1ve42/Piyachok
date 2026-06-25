import {Checkbox, Label} from "@heroui/react";
import {useFeaturesQuery} from "@/src/hooks/tanstack-query/useFeaturesQuery";
import {FC} from "react";

type PropsType = {
    handleFeatureCheck: (feature: string) => ((isSelected: boolean) => void)
    isShownTextAboutOptional?: boolean
    initialFeatures?: string[]
}

const FeatureSelection: FC<PropsType> = ({handleFeatureCheck, initialFeatures, isShownTextAboutOptional = false}) => {
    const featuresQuery = useFeaturesQuery()
    if(featuresQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <div>
            <Label>Особливості {isShownTextAboutOptional && <span>(не обов&#39;язково)</span>}</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
                {featuresQuery.data && featuresQuery.data.success && featuresQuery.data.data.map(feature => <div key={feature}>
                    <Checkbox id={feature} name={'features[]'} value={feature} onChange={handleFeatureCheck(feature)} defaultSelected={initialFeatures && initialFeatures.some(featureFromApi => featureFromApi === feature)}>
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
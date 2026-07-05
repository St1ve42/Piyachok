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
                {featuresQuery.data && featuresQuery.data.success && Object.entries(featuresQuery.data.data).map(([featureInEnglish, featureInUkrainian]) => <div key={featureInEnglish}>
                    <Checkbox id={featureInEnglish} name={'features[]'} value={featureInEnglish} onChange={handleFeatureCheck(featureInEnglish)} defaultSelected={initialFeatures && initialFeatures.some(featureFromApi => featureFromApi === featureInEnglish)}>
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                            <Label htmlFor={featureInUkrainian}>{featureInUkrainian}</Label>
                        </Checkbox.Content>
                    </Checkbox>
                </div>)}
            </div>
        </div>
    )
}

export default FeatureSelection
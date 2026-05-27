import {Checkbox, Label} from "@heroui/react";
import {useFeatures} from "@/src/tanstack-query-hooks/useFeatures";

const FeatureSelection = () => {
    const featuresQuery = useFeatures()
    if(featuresQuery.isLoading){
        return <div>Завантаження...</div>
    }
    return (
        <div>
            <Label>Особливості</Label>
            <div className="grid grid-cols-2 gap-3">
                {featuresQuery.data && featuresQuery.data.success && featuresQuery.data.data.map(feature => <div key={feature}>
                    <Checkbox id={feature} name={'features[]'} value={feature}>
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
import { ProgressBar } from "@heroui/react";
import {FC} from "react";

type PropsType = {
    value: number;
    displayedValue: number
}

const BaseProgressBar: FC<PropsType> = ({value, displayedValue}) => {
    return (
        <ProgressBar aria-label="rating" value={value} valueLabel={<div>{displayedValue}</div>}>
        <ProgressBar.Track>
          <ProgressBar.Fill className="bg-yellow-300"/>
        </ProgressBar.Track>
      </ProgressBar>
    );
}

export default BaseProgressBar
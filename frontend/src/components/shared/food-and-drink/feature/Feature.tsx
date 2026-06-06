import Image, {StaticImageData} from "next/image";

type PropsType = {
    image: StaticImageData;
    alt: string;
    featureName: string;
}

const Feature = ({ image, alt, featureName }: PropsType) => {
    return (
        <div className="flex flex-col items-center">
            <Image src={image} alt={alt} width={30} height={30} priority={true}/>
            <p>{featureName}</p>
        </div>
    )
}

export default Feature
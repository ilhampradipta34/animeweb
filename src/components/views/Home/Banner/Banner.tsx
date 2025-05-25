import { Anime } from "@/types/Anime";
import HeroSlider from "./HeroSlider";

interface PropTypes {
    dataBanner: Anime[]
}


const Banner = (props: PropTypes) => {
    const {dataBanner} = props;
    return (
        <div>
            <HeroSlider dataBanner={dataBanner}  />
        </div>
    )
}


export default Banner;
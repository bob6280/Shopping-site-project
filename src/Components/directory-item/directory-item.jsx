import { BackGroundImage, Body, DirectoryItemContainer } from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({categoryProp}) => {
    const {title, imageUrl, route} = categoryProp;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackGroundImage 
            imageUrl={imageUrl}
            />
            <Body>
                <h2>{title}</h2>
                <p>Explore</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;
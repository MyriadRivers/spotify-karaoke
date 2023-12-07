import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const InfiniteRotate = styled.div`
    width: 50px;
    height: 50px;
    border: 10px solid;
    border-top: 10px solid #d12f4e;
    border-radius: 50%;
    animation: ${rotate} 1.5s linear infinite;
`

const StyledLoading = styled.div`
    aspect-ratio: 1/1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`

const Loading = () => {
    return (
        <StyledLoading>
            <InfiniteRotate />
            Generating synchronized lyrics, this should take around 2 minutes...
        </StyledLoading>
    )
}

export default Loading;
import styled from "styled-components"
import { IMAGE_PLACEHOLDER } from "../../../constants";
import { useReducer, useState } from "react";
import { CREATION_ACTION_TYPES, creationReducer } from "../../../reducers/CreationReducer";
import { uploadImage } from "../../../api";
import { Loading } from "../Loading";
import { CheckIcon } from "../CheckIcon";
import { Button } from "../Styled/Button";



const MessageContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    over-flow: hidden;
    flex-direction: column;
    gap: 18px;

    .error-icon,
    .created-icon {
        width: 48px;
        height: 48px;

        img {
            width: 100%;
        }
    }
`;

const UploadImageContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;

    img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    label {
        position: relative;
        input {
            display: none;
        }
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: white;
        font-weight: bold;
        font-size: 24px;
    }
`;

type Props = {
    onUpload: (url: string) => void
}

export const UploadImage: React.FC<Props> = ({ onUpload }) => {

    const [imageUpload, dispatch] = useReducer(creationReducer, {
        isLoading: false,
        isError: false,
        created: false
    });

    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: CREATION_ACTION_TYPES.SET_IS_LOADING, payload: true });

        const formData = new FormData(e.currentTarget);
        const files = formData.get('file') as File;

        uploadImage(files).then((data) => {
            dispatch({ type: CREATION_ACTION_TYPES.SET_CREATED, payload: true });
            onUpload(data.location);
        }).catch(() => {
            dispatch({ type: CREATION_ACTION_TYPES.SET_IS_ERROR, payload: true });
        })

    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    if (imageUpload.isLoading) {
        return (
            <MessageContainer>
                <Loading />
                <div>
                    Please wait...
                </div>
            </MessageContainer>
        )
    }

    if (imageUpload.isError) {
        return (
            <MessageContainer>
                <div className="error-icon">
                    <CheckIcon checked={false} />
                </div>
                <div className="error-message">
                    An error has occurred.
                </div>
            </MessageContainer>
        )
    }

    if (imageUpload.created) {
        return (
            <MessageContainer>
                <div className="created-icon">
                    <CheckIcon checked={true} />
                </div>
                <div>
                    Category created successfully.
                </div>
            </MessageContainer>
        )
    }

    return (
        <UploadImageContainer onSubmit={handleSubmit}>
            <h2>Upload Image</h2>
            <label>
                <img
                    src={imagePreview as string || IMAGE_PLACEHOLDER.IMAGE_300}
                    onError={(e) => e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300}
                />
                <input
                    type="file"
                    name="file"
                    onChange={handleFileInputChange}
                    accept="image/*" 
                    required />
                <div className="overlay">
                    Select an image
                </div>
            </label>
            <Button type="submit">Upload</Button>
        </UploadImageContainer>
    )
}
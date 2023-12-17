import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { IMAGE_PLACEHOLDER } from "../../../constants";
import { postCategory } from "../../../api";
import { Loading } from "../../../shared/components/Loading";
import { CheckIcon } from "../../../shared/components/CheckIcon";
import { CREATION_ACTION_TYPES, creationReducer } from "../../../reducers/CreationReducer";


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

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;

  .image-input {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    widht: 100%;
    border-radius: 10px;
    img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        overflow: hidden;
    }
    input {
        display: none;
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
  }

`;
export const NewCategoryForm: React.FC = () => {

    const [categoryCreation, dispatch] = useReducer(creationReducer, {
        isLoading: false,
        isError: false,
        created: false
    });


    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch({ type: CREATION_ACTION_TYPES.SET_IS_LOADING, payload: true });

        const formData = new FormData(e.target as HTMLFormElement);
        const payload = {
            name: formData.get("name") as string,
            image: IMAGE_PLACEHOLDER.IMAGE_300 as string
        };
        postCategory(payload).then(() => {
            dispatch({ type: CREATION_ACTION_TYPES.SET_CREATED, payload: true });
        }).catch(() => {
            dispatch({ type: CREATION_ACTION_TYPES.SET_IS_ERROR, payload: true });
        });
    };

    if (categoryCreation.isLoading) {
        return (
            <MessageContainer>
                <Loading />
                <div>
                    Please wait...
                </div>
            </MessageContainer>
        )
    }

    if (categoryCreation.isError) {
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

    if (categoryCreation.created) {
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
        <StyleForm onSubmit={handleSubmit}>

            <label className="image-input">
                <img
                    src={imagePreview as string || IMAGE_PLACEHOLDER.IMAGE_300}
                    alt=""
                    onError={(e) => (e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300)}
                />
                <input type="file" name="image" id="" onChange={handleFileInputChange} accept="image/*" required />
                <div className="overlay">
                    Select an image
                </div>
            </label>

            <input className="text-input" type="text" name="name" placeholder="Category Name" required />

            <button className="btn btn-primary" type="submit">
                Create Category
            </button>
        </StyleForm>
    )

};

import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { IMAGE_PLACEHOLDER } from "../../../constants";
import { updateCategory } from "../../../api";
import { Loading } from "../../../shared/components/Loading";
import { CheckIcon } from "../../../shared/components/CheckIcon";
import { CREATION_ACTION_TYPES, creationReducer } from "../../../reducers/CreationReducer";
import { Category } from "../../../types";


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
        height: 300px;
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

type Props = {
    data: Category
}

export const UpdateCategoryForm: React.FC<Props> = ({ data }) => {

    const [categoryCreation, dispatch] = useReducer(creationReducer, {
        isLoading: false,
        isError: false,
        created: false
    });

    const [name, setName] = useState(data.name);


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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: CREATION_ACTION_TYPES.SET_IS_LOADING, payload: true });

        const formData = new FormData(e.target as HTMLFormElement);

        const imageFiles = formData.getAll('image') as File[];

        updateCategory(formData, imageFiles[0].size ? imageFiles[0] : null, data.id).then(() => {
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
                    Category updated successfully.
                </div>
            </MessageContainer>
        )
    }

    return (
        <StyleForm onSubmit={handleSubmit} encType="multipart/form-data">

            <label className="image-input">
                <img
                    src={imagePreview as string || data.image}
                    alt=""
                    onError={(e) => (e.currentTarget.src = IMAGE_PLACEHOLDER.IMAGE_300)}
                />
                <input type="file" name="image" id="" onChange={handleFileInputChange} accept="image/*" />
                <div className="overlay">
                    Select a new image
                </div>
            </label>

            <input
                className="text-input"
                type="text"
                name="name"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)} />

            <button className="btn btn-primary" type="submit">
                Update Category
            </button>
        </StyleForm>
    )

};

import React, { useState } from "react";
import styled from "styled-components";
import { IMAGE_PLACEHOLDER } from "../../../constants";
import { postCategory } from "../../../api";

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

type Props = {
}

export const NewCategoryForm: React.FC<Props> = () => {

    const [ isLoading, setIsLoading ] = useState(false);

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
        const formData = new FormData(e.target as HTMLFormElement);
        postCategory({
            name: formData.get("name") as string,
            image: IMAGE_PLACEHOLDER.IMAGE_300 as string
        }).then(console.log).catch(console.error);
    };

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
    );
};

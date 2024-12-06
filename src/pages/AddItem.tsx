import React, {useState} from 'react';
import {CalendarDate, DatePicker, Input, Radio, RadioGroup, Skeleton, Textarea} from "@nextui-org/react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../components/ui/MyButton";
import {useCategoriesData} from "../api/categoriesApi";
import {useAddItem} from "../api/addItemApi";
import MyMiniImage from "../components/ui/MyMiniImage";
import {HiChevronLeft} from "react-icons/hi";
import {HiChevronRight} from "react-icons/hi";
import {DateValue} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

export type AddItemFormBody = {
    itemName: string;
    description: string;
    categoryId: string;
    type: 'lost' | 'found';
    date: CalendarDate
    images: File[]
}

function AddItem() {
    const addItemForm = useForm<AddItemFormBody>()
    const categoriesData = useCategoriesData()
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const {mutate: addItem, isLoading, isError, isSuccess, error} = useAddItem();
    const [mainImage, setMainImage] = useState<number>(0);
    const formatter = useDateFormatter()



    const onSubmitAddItem: SubmitHandler<AddItemFormBody> = async (data) => {
        const formData = {...data, images: images};
        console.log(formData)
        addItem(formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length + images.length > 5) {
                alert("U can choose only 10 images")
                return
            }
            const files = Array.from(e.target.files);
            console.log(files)
            setImages([...images, ...files]);

            const previewUrls = files.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previewUrls]);
        }
    };

    const deleteImage = (index: number) => {
        setImages(images.filter((_, id) => id !== index));
        setImagePreviews(imagePreviews.filter((_, id) => id !== index));
        if (mainImage < imagePreviews.length - 1) {

        }
    }
    const nextPhoto = () => {
        setMainImage(prevState => prevState + 1)
    }
    const prevPhoto = () => {
        setMainImage(prevState => prevState - 1)
    }

    const formatDate = (date: DateValue) => {
        const day = date.day.toString().padStart(2, '0');
        const month = (date.month + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.year;

        return `${day}-${month}-${year}`; // Returns the formatted string as "DD-MM-YYYY"
    }

    return (
        <div className="flex gap-4 w-full">
            <div className="w-1/2 flex gap-7.5">
                <div className="w-1/5 flex flex-col gap-4">
                    {imagePreviews.map((image, index) => (
                        <MyMiniImage key={index} src={image}
                                     className={`cursor-pointer ${mainImage === index && 'border-blue-500 border-2'}`}
                                     onClick={() => setMainImage(index)}/>
                    ))}
                    {Array.from({length: 4 - imagePreviews.length}).map((_, index) => (
                        <MyMiniImage key={index} src={'/icons/addPhoto-scelet.svg'}/>
                    ))}
                </div>
                <div className="w-4/5 ">
                    <div className="w-[444px] h-[444px] bg-zinc-50 relative select-none">
                        <button onClick={prevPhoto}
                                disabled={imagePreviews.length === 0 || mainImage === 0}
                                className={`absolute h-[40px] m-auto cursor-pointer bottom-0 left-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden`}>
                            <HiChevronLeft size="2rem" color={"white"}/>
                        </button>
                        <button onClick={nextPhoto}
                                disabled={imagePreviews.length === 0 || mainImage === imagePreviews.length - 1}
                                className={`absolute h-[40px] m-auto cursor-pointer bottom-0 right-0 top-0 rounded-2xl transition hover:scale-125 disabled:hidden`}>
                            <HiChevronRight size="2rem" color={'white'}/>
                        </button>

                        {imagePreviews.length <= 0 &&
							<img className='w-full h-full object-cover' src="/icons/addPhoto-scelet.svg"
							     alt="addPhoto-scelet.svg"/>}
                        {imagePreviews.length > 0 &&
							<img className='w-full h-full object-cover' src={imagePreviews[mainImage]}
							     alt="addPhoto-scelet.svg"/>}
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <h2>Item Details</h2>
                <form className="flex flex-col gap-4 " onSubmit={addItemForm.handleSubmit(onSubmitAddItem)}>
                    {/*todo create MyInput component*/}
                    <Input type="text" size="sm" label="Name"
                           isInvalid={!!addItemForm.formState.errors.itemName}
                           errorMessage={addItemForm.formState.errors.itemName?.message}
                           radius="sm"
                           className={`w-[60%]`}
                           classNames={{
                               inputWrapper: "border border-neutral-200 bg-white rounded",
                           }}
                           {...addItemForm.register("itemName", {
                               required: "Name is required",
                           })}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Enter your description"
                        className={`w-[60%]`}
                        isInvalid={!!addItemForm.formState.errors.description}
                        classNames={{
                            inputWrapper: "border border-neutral-200 bg-white rounded",
                        }}
                        {...addItemForm.register("description", {
                            required: "Description is required",
                        })}
                    />

                    <div className="">
                        <Controller
                            name='categoryId'
                            control={addItemForm.control}
                            rules={{required: "Select the Category",}}
                            render={({field}) => (
                                <RadioGroup
                                    value={field.value}
                                    onChange={field.onChange}
                                    isInvalid={!!addItemForm.formState.errors.categoryId}
                                    label="Category:">
                                    <div className={`grid grid-cols-2 gap-2`}>
                                        {categoriesData.isLoading &&
                                            Array.from({length: 4}).map((_, index) => (
                                                <Skeleton key={index} className="rounded-lg">
                                                    <div className="h-8 rounded-lg bg-default-300"></div>
                                                </Skeleton>
                                            ))
                                        }
                                        {categoriesData.isSuccess &&
                                            categoriesData.data.map(category => (
                                                <Radio key={category.id} value={category.id}>{category.name}</Radio>
                                            ))}
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="">
                        <Controller
                            name='type'
                            control={addItemForm.control}
                            rules={{required: "Select the Type"}}
                            render={({field}) => (
                                <RadioGroup
                                    value={field.value}
                                    onChange={field.onChange}
                                    isInvalid={!!addItemForm.formState.errors.type}
                                    label="Type:">
                                    <div className={`flex gap-4`}>
                                        <Radio value={'lost'}>Lost Item</Radio>
                                        <Radio value={'found'}>Found Item</Radio>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    <div className="">
                        <Controller name='date'
                                    control={addItemForm.control}
                                    rules={{required: "Select the Lost Date",}}
                                    render={({field}) => (
                                        <DatePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            isInvalid={!!addItemForm.formState.errors.date}
                                            label="Found/Lost date"
                                            className="w-[60%]"
                                            showMonthAndYearPickers={true}
                                            granularity="day"
                                            errorMessage={(value) => {
                                                if (value.isInvalid) {
                                                    return addItemForm.formState.errors.date?.message;
                                                }
                                            }}
                                        />
                                    )}  />

                    </div>

                    <div className="mt-4">
                        <label className="block">Upload Images</label>
                        <div className="flex gap-2 flex-wrap">
                            {imagePreviews.map((image, index) => (
                                <div key={index} className="w-[100px] h-[100px] bg-neutral-300 relative rounded-lg">
                                    <button type='button'
                                            className={`absolute top-[-5px] right-[-5px] bg-red-500 p-1 rounded-2xl text-white`}
                                            onClick={() => deleteImage(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="white"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                    <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover"/>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-2"
                            disabled={images.length >= 10}
                        />
                    </div>

                    <MyButton color={`primary`} type={`submit`} className={`w-[100px]`}>Add Item</MyButton>
                </form>
            </div>
        </div>
    );
}

export default AddItem;
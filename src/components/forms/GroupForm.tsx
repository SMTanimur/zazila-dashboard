'use client';

import { typeIconList } from '@/configs/type-setting';
import { useGroup } from '@/hooks/group/useGorup';
import { IType, ImageInfo } from '@/types';
import { TGroup, groupsSchema } from '@/validations/groups';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from '../ui/form';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import * as typeIcons from '../icons/type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getIcon } from '@/utils/get-icon';
import { IUploadedImage } from '@/services/upload.service';
import { Zoom } from '../common/shared/zoom-image';
import Image from 'next/image';
import { FilesDialog } from '../common/shared/files-dialog';
import { Textarea } from '../ui/textarea';
import { FileDialog } from '../common/shared/file-dialog';
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

export const updatedIcons = typeIconList.map((item: any) => {
  item.label = (
    <div className='flex space-s-5 items-center'>
      <span className='flex w-5 h-5 items-center justify-center'>
        {getIcon({
          iconList: typeIcons,
          iconName: item.value,
          className: 'max-h-full max-w-full',
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type BannerInput = {
  title: string;
  description: string;
  image: ImageInfo;
};

type FormValues = {
  name: string;
  promotional_sliders: ImageInfo[];
  banners?: BannerInput[];
};
interface GroupFormProps {
  initialData?: IType | null;
}

const GroupForm = ({ initialData }: GroupFormProps) => {
  const [imageSlider, setImageSlider] = React.useState<IUploadedImage[] | null>(
    null
  );
  const [files, setFiles] = React.useState<IUploadedImage | null>(null);
  const queryClient = useQueryClient();
  const groupForm = useForm<TGroup>({
    resolver: zodResolver(groupsSchema),
    defaultValues: {
      ...initialData,
    },
  });
 console.log(imageSlider,'image')
  const {
    GroupCreateLoading,
    GroupUpdateLoading,
    GroupUpdateMutation,
    attemptGroupCreate,
  } = useGroup();

  const { fields, append, remove } = useFieldArray({
    control: groupForm.control,
    name: 'banners',
  });

  const attemptGroupUpdate = async (data: TGroup) => {
    toast.promise(
      GroupUpdateMutation({
        variables: { id: initialData?._id as string, input: data },
      }),
      {
        loading: 'updating...',
        success: data => {
          queryClient.invalidateQueries(['types']);
          return <b>{data.message}</b>;
        },
        error: error => {
          const {
            response: { data },
          }: any = error ?? {};

          return <b> {data?.message}</b>;
        },
      }
    );
  };

  const onSubmit = async (values: TGroup) => {
    const input:any = {
      name: values.name!,
      ...(values.promotional_sliders
        ? {
            promotional_sliders: [
              ...values.promotional_sliders.map(value => {
                return {
                  img_id: value?.img_id,
                  img_url: value?.img_url,
                };
              }),
            ],
          }
        : {}),
      banners: values.banners?.map(banner => ({
      
        description: banner?.description,
        title: banner?.title,

        image: {
          img_id: banner?.image?.img_id,
          img_url: banner?.image?.img_url,
        },
      })),
    };
    if (!initialData) {
      attemptGroupCreate(input);
    }
  };
  console.log(groupForm.getValues('banners'));
  return (
    <React.Fragment>
      <Form {...groupForm}>
        <form
          className='grid gap-10 w-full'
          onSubmit={
            initialData
              ? (...args) =>
                  void groupForm.handleSubmit(attemptGroupUpdate)(...args)
              : (...args) => void groupForm.handleSubmit(onSubmit)(...args)
          }
        >
          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Basic Info</h4>
              <p>Add some basic info about your shop from here</p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormField
                    control={groupForm.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className='my-4'>
                  <FormField
                    control={groupForm.control}
                    name='icon'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <Select
                            defaultOpen={false}
                            value={field.value}
                            onValueChange={(value: typeof field.value) =>
                              field.onChange(value)
                            }
                          >
                            <SelectTrigger className='capitalize'>
                              <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {updatedIcons.map(({ label, value }) => (
                                  <SelectItem
                                    key={value}
                                    value={value}
                                    className='capitalize'
                                  >
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
              </Card>
            </div>
          </div>

          <div className='border-dotted w-full border-2 ' />
          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>
                Promotional Sliders
              </h4>
              <p>
                Upload your shop cover image from here Dimension of the cover
                image should be 1170 x 435px
              </p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='p-8  w-full'>
                <div className='my-4'>
                  <FormItem className='flex w-full flex-col gap-1.5'>
                    <FormLabel>Promotional Sliders</FormLabel>
                    {initialData?.promotional_sliders.length ? (
                      <div className='flex items-center gap-2'>
                        {initialData?.promotional_sliders.map(
                          (image, index) => (
                            <Zoom key={index}>
                              <Image
                                src={image.img_url}
                                alt={image.img_id}
                                className='h-20 w-20 shrink-0 rounded-md object-cover object-center'
                                width={80}
                                height={80}
                              />
                            </Zoom>
                          )
                        )}
                      </div>
                    ) : null}
                    {imageSlider?.length ? (
                      <div className='flex items-center gap-2'>
                        {imageSlider?.map((image, index) => (
                          <Zoom key={index}>
                            <Image
                              src={image.img_url}
                              alt={image.img_id}
                              className='h-20 w-20 shrink-0 rounded-md object-cover object-center'
                              width={80}
                              height={80}
                            />
                          </Zoom>
                        ))}
                      </div>
                    ) : null}
                    <FormControl>
                      <FilesDialog
                        setValue={groupForm.setValue}
                        name='promotional_sliders'
                        maxFiles={5}
                        maxSize={1024 * 1024 * 4}
                        multiple={true}
                        files={
                          initialData
                            ? initialData?.promotional_sliders
                            : (imageSlider as IUploadedImage[])
                        }
                        setFiles={setImageSlider}
                      />
                    </FormControl>
                    <UncontrolledFormMessage
                      message={
                        groupForm.formState.errors.promotional_sliders?.message
                      }
                    />
                  </FormItem>
                </div>
              </Card>
            </div>
          </div>

          <div className='border-dotted w-full border-2 ' />
          <div className='flex flex-col items-center gap-4 w-full lg:flex-row'>
            <div className='lg:w-1/3 w-full flex flex-col items-start gap-2'>
              <h4 className='text-stone-800 font-semibold'>Add Banner</h4>
              <p>Add some basic info about your shop from here</p>
            </div>
            <div className='lg:w-2/3 w-full'>
              <Card className='w-full sm:w-8/12 md:w-full p-8'>
                <div>
                  {fields.map((item: any & { id: string }, index: number) => (
                    <div
                      className='border-b border-dashed border-border-200 last:border-0 py-5 md:py-8 first:pt-0'
                      key={item.id}
                    >
                      <div className='flex items-center justify-between mb-5'>
                        <h5 className='mb-0'>Banner {index + 1}</h5>
                        <button
                          onClick={() => {
                            remove(index);
                          }}
                          type='button'
                          className='text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1'
                        >
                          Remove banner
                        </button>
                      </div>
                      <div className='grid grid-cols-1 gap-5'>
                        <FormField
                          control={groupForm.control}
                          name={`banners.${index}.title` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Banner Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={groupForm.control}
                          name={`banners.${index}.description` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Banner description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className='w-full mt-5'>
                        <FormItem className='flex w-full flex-col gap-1.5'>
                          <FormLabel>Logo</FormLabel>
                          {files ? (
                            <div className='flex items-center gap-2'>
                              <Zoom>
                                <Image
                                  src={files?.img_url as string}
                                  alt={files.img_id as string}
                                  className='h-20 w-20 shrink-0 rounded-md object-cover object-center'
                                  width={80}
                                  height={80}
                                />
                              </Zoom>
                            </div>
                          ) : null}
                          <FormControl>
                            <FileDialog
                              setValue={groupForm.setValue}
                              name={`banners.${index}.image` as const}
                              maxFiles={1}
                              maxSize={1024 * 1024 * 4}
                              multiple={false}
                              files={files as IUploadedImage}
                              setFiles={setFiles}
                            />
                          </FormControl>
                          <UncontrolledFormMessage
                            message={`${groupForm.formState.errors.banners}.${index}.image.message`}
                          />
                        </FormItem>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type='button'
                  onClick={() =>
                    append({
                      description: '',
                      image: {
                        img_id: '',
                        img_url: '',
                      },
                      title: '',
                    })
                  }
                  className='w-full sm:w-auto'
                >
                  Add Banner
                </Button>

                {/* {errors?.banners?.message ? (
            <Alert
              message={t(errors?.banners?.message)}
              variant="error"
              className="mt-5"
            />
          ) : null} */}
              </Card>
            </div>
          </div>


          <div className='flex items-end justify-end'>
            <Button
              disabled={GroupUpdateLoading || GroupCreateLoading}
              className='w-[200px] '
            >
            
              {GroupUpdateLoading || GroupCreateLoading ? (
                <Icons.spinner
                  className='mr-2 h-4 w-4 animate-spin'
                  aria-hidden='true'
                />
              ) : (
                <React.Fragment>
                  <span>{initialData ? 'Update' : 'Save'}</span>
                </React.Fragment>
              )}
          
            </Button>
          </div>
        </form>
      </Form>
    </React.Fragment>
  );
};

export default GroupForm;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { generateImageSchema, GenerateImageSchema } from "@/lib/zod";
import { useImages } from "@/store/image-store";
import { Image } from "@imagekit/next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export const GenerateImage = () => {
  const { addImage } = useImages();
  const [image, setImage] = useState<{ base64Data: string; name: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [generatingLoader, setGeneratingLoader] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GenerateImageSchema>({
    defaultValues: {
      description: "",
      name: "",
    },
    resolver: zodResolver(generateImageSchema),
  });

  const onSubmit = async ({ description, name }: GenerateImageSchema) => {
    const toastId = toast.loading("Generating image...");
    try {
      setGeneratingLoader(true);

      if (!description || !name)
        throw new Error("Description and name are required");

      // generate image server action

      toast.success("Image generated successfully", { id: toastId });
    } catch {
      toast.error("Error generating image", { id: toastId });
    } finally {
      setGeneratingLoader(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold ">Generate Images</h1>
      <p className="text-muted-foreground">
        Use AI to generate an image of your dream car
      </p>
      <form
        className="mt-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the car you want to generate..."
            rows={6}
            required
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="file-name">File Name</Label>
          <Input
            id="file-name"
            placeholder="Enter a name for the generated Image"
            required
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <Button disabled={isLoading}>
          {isLoading ? "Generating" : "Generated Image"}
        </Button>
      </form>
      {image && (
        <>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Generated Image</h2>
            {generatingLoader ? (
              <Skeleton className="w-full h-96 rounded-lg flex items-center justify-center" />
            ) : (
              <Image
                width={1000}
                height={1000}
                src={image.base64Data}
                alt="Generated Car"
                className="w-full h-[25rem] object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant={"outline"}>Cancel</Button>
            <Button>Save Images</Button>
          </div>
        </>
      )}
    </div>
  );
};

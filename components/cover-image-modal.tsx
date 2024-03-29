"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { SingleImageDropzone } from "./single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    setIsUploading(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsUploading(true);
      setFile(file);

      let res;
      if (coverImage.url) {
        res = res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: coverImage.url,
          },
        });
      } else {
        res = await edgestore.publicFiles.upload({ file });
      }

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none "
          disabled={isUploading}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

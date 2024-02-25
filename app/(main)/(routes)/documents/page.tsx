"use client";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import Image from "next/image";

import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: "Creating...",
      success: "Document created!",
      error: "Failed to create document!",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="empty"
        className="hidden dark:block"
      />

      <Image
        src="/empty.png"
        height={300}
        width={300}
        alt="empty"
        className="dark:hidden"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.fullName}&apos;s NoteFlow
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;

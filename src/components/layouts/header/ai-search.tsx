"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon, SmileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
const AISearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");

  const submitHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      setDescription("");
    }, 2000);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className="ml-auto mr-4  flex items-center gap-1  bg-muted rounded-lg px-4 py-2 hover:bg-muted">
        <SearchIcon className="h-4 w-4 mr-1" /> Search with AI
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Define what type of car you like </DialogTitle>
          <DialogDescription>
            You can tell features like color, type, and model. For example: I
            like a red SUV with a sunroof.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <Textarea
            placeholder="Write about your dream car..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="max-h-[20rem]"
            style={{
              // @ts-expect-error: css not updated
              fieldSizing: "content",
            }}
          />

          <Button disabled={isLoading} className="flex items-center gap-1">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                <SmileIcon className="h-5 w-5" /> Find my dream car
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AISearch;

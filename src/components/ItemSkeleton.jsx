import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Variants() {
  return (
    <div className="flex">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <Stack
            spacing={1}
            className="flex items-center justify-center w-80"
            key={i}
          >
            <Skeleton
              variant="circular"
              animation="wave"
              width={200}
              height={200}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={250}
              height={40}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={120}
              height={40}
            />
          </Stack>
        ))}
    </div>
  );
}

import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";

export default function Variants() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  return (
    <div className="flex">
      {Array(isSmallScreen ? 3 : 5)
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
              width={isSmallScreen ? 90 : 200}
              height={isSmallScreen ? 90 : 200}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={isSmallScreen ? 80 : 200}
              height={isSmallScreen ? 25 : 40}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={isSmallScreen ? 100 : 200}
              height={isSmallScreen ? 25 : 40}
            />
          </Stack>
        ))}
    </div>
  );
}

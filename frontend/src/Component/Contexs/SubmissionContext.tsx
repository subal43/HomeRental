// SubmissionContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SubmissionContextType {
  hasSubmitted: boolean;
  markSubmission: (value: boolean, username: string) => void;
  resetSubmission: () => void;
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export const SubmissionProvider = ({ children }: { children: ReactNode }) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const { name } = JSON.parse(currentUser);
      const submitted = localStorage.getItem(`submitted_${name}`);
      if (submitted === "true") setHasSubmitted(true);
    }
  }, []);

  const markSubmission = (value: boolean, username: string) => {
    setHasSubmitted(value);
    localStorage.setItem(`submitted_${username}`, "true");
  };

  const resetSubmission = () => {
    setHasSubmitted(false);
  };

  return (
    <SubmissionContext.Provider value={{ hasSubmitted, markSubmission, resetSubmission }}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmission = () => {
  const context = useContext(SubmissionContext);
  if (!context) throw new Error("useSubmission must be used within SubmissionProvider");
  return context;
};

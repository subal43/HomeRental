// src/utils/fakeSubmit.ts
export const fakeSubmitProperty = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Simulates successful API call
    }, 1000); // 1 second delay
  });
};

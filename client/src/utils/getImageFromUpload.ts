export default async function getImageFromUpload(file: {
  originFileObj: { type: string; size: number }; // Ensure size is included for validation
  url: string;
  name: string;
}): Promise<[Blob, string] | undefined> {
  if (file?.originFileObj) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file.originFileObj as Blob);
      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], {
          type: file.originFileObj.type,
        });
        resolve([blob, file.name]);
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reader.onerror = (error) => reject(new Error("Failed to read file"));
    });
  }
  return undefined; // Handle case where originFileObj is missing
}

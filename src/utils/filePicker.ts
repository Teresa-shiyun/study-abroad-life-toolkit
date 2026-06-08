export interface PickedFile {
  name: string;
  type?: string;
  uri?: string;
}

export async function pickFile() {
  if (typeof document === "undefined") {
    return {
      name: `mobile-selected-file-${Date.now()}.pdf`,
      type: "application/pdf",
      uri: `local://selected/mobile-selected-file-${Date.now()}.pdf`
    };
  }

  return new Promise<PickedFile | undefined>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx";
    input.style.display = "none";

    input.onchange = () => {
      const file = input.files?.[0];
      const selectedFile = file
        ? {
            name: file.name,
            type: file.type,
            uri: URL.createObjectURL(file)
          }
        : undefined;
      input.remove();
      resolve(selectedFile);
    };

    input.oncancel = () => {
      input.remove();
      resolve(undefined);
    };

    document.body.appendChild(input);
    input.click();
  });
}

export async function pickFileName() {
  const file = await pickFile();
  return file?.name;
}

export function openPickedFile(uri?: string) {
  if (!uri || typeof window === "undefined" || uri.startsWith("local://")) {
    return false;
  }

  window.open(uri, "_blank", "noopener,noreferrer");
  return true;
}

export function isImageFile(fileName?: string, fileType?: string) {
  if (fileType?.startsWith("image/")) {
    return true;
  }

  return Boolean(fileName?.match(/\.(png|jpg|jpeg|webp|gif)$/i));
}

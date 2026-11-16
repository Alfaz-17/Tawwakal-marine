export const uploadToCloudinary = async (file: File | Blob, folder = "tawwakal-automation"): Promise<string> => {
  try {
    // 1. Primary: Use our secure server-side upload endpoint
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const apiRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data.url) return data.url;
    }

    // 2. Client-side direct fallback if /api/upload returned an error
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "aedvwuiw";
    const directFormData = new FormData();
    directFormData.append("file", file);
    directFormData.append("upload_preset", "corona");
    directFormData.append("folder", folder);

    // Try user's cloud
    let response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: directFormData,
      }
    );

    // If user's cloud doesn't have the preset yet, fallback to working verified cloud
    if (!response.ok) {
      response = await fetch(
        "https://api.cloudinary.com/v1_1/dljbyn2lk/image/upload",
        {
          method: "POST",
          body: directFormData,
        }
      );
    }

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cloudinary upload error: ${errText}`);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    throw new Error(error.message || "Image upload failed. Please try again.");
  }
};

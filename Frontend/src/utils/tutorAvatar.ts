export const TUTOR_IMAGE_MAP: Record<string, string> = {
  "asifur rahman": "/assets/images/tutors/asifur-rahman.png",
  "sumaiya afroze": "/assets/images/tutors/sumaiya-afroze.png",
  "tanvir ahmed": "/assets/images/tutors/tanvir-ahmed.png",
  "nusrat jahan": "/assets/images/tutors/nusrat-jahan.png",
};

const DEFAULT_TUTOR_IMAGES = [
  "/assets/images/tutors/asifur-rahman.png",
  "/assets/images/tutors/sumaiya-afroze.png",
  "/assets/images/tutors/tanvir-ahmed.png",
  "/assets/images/tutors/nusrat-jahan.png",
];

export function getTutorProfileImage(tutor: {
  name?: string;
  id?: string;
  userId?: string;
  profilePhoto?: string;
  avatar?: string;
  user?: { name?: string };
}): string {
  const customPhoto = tutor.profilePhoto || tutor.avatar;
  
  if (customPhoto && customPhoto !== "/assets/images/student.jpg" && customPhoto.trim() !== "") {
    return customPhoto;
  }

  const name = (tutor.name || tutor.user?.name || "").toLowerCase().trim();
  
  for (const [key, val] of Object.entries(TUTOR_IMAGE_MAP)) {
    if (name.includes(key) || key.includes(name)) {
      return val;
    }
  }

  // Deterministic fallback based on id or name string code
  const keyStr = tutor.id || tutor.userId || name || "tutor";
  let hash = 0;
  for (let i = 0; i < keyStr.length; i++) {
    hash = keyStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % DEFAULT_TUTOR_IMAGES.length;
  return DEFAULT_TUTOR_IMAGES[index];
}

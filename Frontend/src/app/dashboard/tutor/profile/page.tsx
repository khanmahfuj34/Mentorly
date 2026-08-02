"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useAuth } from "@/src/hooks/useAuth"
import { getMyTutorProfile, createTutorProfile, updateTutorProfile } from "@/src/services/tutor/tutor.service"
import { getLocationOptions, getUpazilasByDistrict } from "@/src/lib/location-utils"
import { getAcademicLevels, getSubjectsByLevel } from "@/src/lib/academic-utils"

// Form validation schema
const tutorProfileSchema = z.object({
  phoneNumber: z.string()
    .min(1, "Phone number is required")
    .regex(/^01\d{9}$/, "Invalid Bangladeshi phone number (e.g. 017XXXXXXXX)"),
  bio: z.string().min(10, "Bio must be at least 10 characters long"),
  profilePhoto: z.string().url("Profile photo must be a valid URL").optional().or(z.literal("")),
  university: z.string().min(1, "University is required"),
  department: z.string().min(1, "Department is required"),
  currentInstitution: z.string().optional().or(z.literal("")),
  teachingSubjects: z.array(z.string()).min(1, "Select at least one subject"),
  preferredClasses: z.array(z.string()).min(1, "Select at least one class"),
  medium: z.array(z.string()).min(1, "Select at least one medium"),
  experienceYears: z.number({ message: "Experience must be a number" }).int().nonnegative("Experience must be a non-negative integer"),
  hourlyRate: z.number({ message: "Hourly rate must be a number" }).positive("Hourly rate must be a positive number"),
  teachingStyle: z.string().optional().or(z.literal("")),
  demoClassOffered: z.boolean(),
  district: z.string().min(1, "District is required"),
  area: z.string().min(1, "Area/Thana is required"),
  address: z.string().min(1, "Full address is required"),
})

type TutorProfileFormValues = z.infer<typeof tutorProfileSchema>

export default function TutorProfilePage() {
  const { user } = useAuth()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [subjectSearch, setSubjectSearch] = useState("")

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TutorProfileFormValues>({
    resolver: zodResolver(tutorProfileSchema),
    defaultValues: {
      phoneNumber: "",
      bio: "",
      profilePhoto: "",
      university: "",
      department: "",
      currentInstitution: "",
      teachingSubjects: [],
      preferredClasses: [],
      medium: [],
      experienceYears: 0,
      hourlyRate: 1000,
      teachingStyle: "",
      demoClassOffered: false,
      district: "",
      area: "",
      address: "",
    },
  })

  // Watched fields for reactive selects, lists and profile completion calculation
  const watchedDistrict = watch("district")
  const watchedFields = watch()

  // Location list data helpers
  const { districts: allDistricts } = getLocationOptions()
  const availableAreas = watchedDistrict ? getUpazilasByDistrict(watchedDistrict) : []

  // Academic list data helpers
  const allAcademicLevels = getAcademicLevels()
  
  // Dynamically resolve all unique subjects from NCTB dataset
  const [allSubjects, setAllSubjects] = useState<string[]>([])
  useEffect(() => {
    const uniqueSubjectsSet = new Set<string>()
    allAcademicLevels.forEach((level) => {
      const subjects = getSubjectsByLevel(level)
      subjects.forEach((sub) => uniqueSubjectsSet.add(sub))
    })
    setAllSubjects(Array.from(uniqueSubjectsSet).sort())
  }, [])

  // Fetch tutor profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true)
        const res = await getMyTutorProfile()
        if (res?.data) {
          const profile = res.data
          setHasProfile(true)

          // Parse full address and bio out of the combined field
          const rawBio = profile.bio || ""
          let parsedAddress = ""
          let parsedBio = rawBio

          if (rawBio.includes("\n\nAddress: ")) {
            const parts = rawBio.split("\n\nAddress: ")
            parsedBio = parts[0]
            parsedAddress = parts[1]
          } else if (rawBio.startsWith("Address: ")) {
            const parts = rawBio.split("\n\n")
            parsedAddress = parts[0].replace("Address: ", "").trim()
            parsedBio = parts.slice(1).join("\n\n")
          }

          reset({
            phoneNumber: profile.phoneNumber || "",
            bio: parsedBio,
            profilePhoto: profile.profilePhoto || "",
            university: profile.university || "",
            department: profile.department || "",
            currentInstitution: profile.currentInstitution || "",
            teachingSubjects: profile.teachingSubjects || [],
            preferredClasses: profile.preferredClasses || [],
            medium: profile.medium || [],
            experienceYears: profile.experienceYears ?? 0,
            hourlyRate: profile.hourlyRate ?? 1000,
            teachingStyle: profile.teachingStyle || "",
            demoClassOffered: profile.demoClassOffered || false,
            district: profile.district || "",
            area: profile.area || "",
            address: parsedAddress,
          })
        }
      } catch (err) {
        // Profile doesn't exist yet, we will POST instead of PATCH
        setHasProfile(false)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [reset])

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setValue("district", value)
    setValue("area", "") // Reset area when district changes
    trigger("district")
  }

  // Real-time completion calculation
  const completionItems = [
    {
      label: "Basic Information",
      completed: !!watchedFields.phoneNumber && !!watchedFields.bio,
    },
    {
      label: "Academic Information",
      completed: !!watchedFields.university && !!watchedFields.department,
    },
    {
      label: "Teaching Information",
      completed:
        (watchedFields.teachingSubjects?.length || 0) > 0 &&
        (watchedFields.preferredClasses?.length || 0) > 0 &&
        (watchedFields.medium?.length || 0) > 0,
    },
    {
      label: "Experience Details",
      completed:
        watchedFields.experienceYears !== undefined &&
        watchedFields.experienceYears !== null &&
        typeof watchedFields.experienceYears === "number" &&
        !isNaN(watchedFields.experienceYears) &&
        !!watchedFields.hourlyRate,
    },
    {
      label: "Location Details",
      completed: !!watchedFields.district && !!watchedFields.area && !!watchedFields.address,
    },
  ]

  const completedCount = completionItems.filter((i) => i.completed).length
  const totalCount = completionItems.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  // Color mappings for radial progress
  let progressColorClass = "text-red-500"
  let profileStrength = "Weak Profile"

  if (completionPercentage >= 80) {
    progressColorClass = "text-primary"
    profileStrength = "Strong Profile"
  } else if (completionPercentage >= 40) {
    progressColorClass = "text-yellow-500"
    profileStrength = "Moderate Profile"
  }

  // Filter teaching subjects checklist
  const filteredSubjects = allSubjects.filter((sub) =>
    sub.toLowerCase().includes(subjectSearch.toLowerCase())
  )

  // Form submit handler
  const onSubmit = async (data: TutorProfileFormValues) => {
    try {
      setIsSubmitting(true)

      // Concatenate bio and full address for persistence
      const combinedBio = `${data.bio.trim()}\n\nAddress: ${data.address.trim()}`

      const payload = {
        bio: combinedBio,
        profilePhoto: data.profilePhoto || undefined,
        phoneNumber: data.phoneNumber,
        university: data.university,
        department: data.department,
        currentInstitution: data.currentInstitution || undefined,
        teachingSubjects: data.teachingSubjects,
        preferredClasses: data.preferredClasses,
        medium: data.medium,
        experienceYears: Number(data.experienceYears),
        hourlyRate: Number(data.hourlyRate),
        teachingStyle: data.teachingStyle || undefined,
        demoClassOffered: data.demoClassOffered,
        district: data.district,
        area: data.area,
      }

      if (hasProfile) {
        const res = await updateTutorProfile(payload)
        toast.success(res?.message || "Tutor profile updated successfully.")
      } else {
        const res = await createTutorProfile(payload)
        setHasProfile(true)
        toast.success(res?.message || "Tutor profile created successfully.")
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      const errorMessage =
        err?.response?.data?.message || err?.message || "Failed to save tutor profile."
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[400px]">
        <span className="material-symbols-outlined text-primary text-[48px] animate-spin mb-4 select-none">
          progress_activity
        </span>
        <p className="text-on-surface-variant font-body-md">Loading tutor profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 md:px-10">
      {/* Header Summary */}
      <div className="mb-8">
        <h2 className="text-headline-lg font-bold text-on-surface mb-2">Tutor Profile Registration</h2>
        <p className="text-on-surface-variant font-body-md">
          Complete your academic, location, and teaching details to get matched with active tuition posts.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Profile Editor Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Basic Information */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">badge</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Basic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name (Read-only) */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface-variant">Full Name *</label>
                <input
                  type="text"
                  value={user?.name || "Tutor Name"}
                  disabled
                  className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-outline cursor-not-allowed outline-none select-none"
                />
              </div>

              {/* Email Address (Read-only) */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface-variant">Email Address *</label>
                <input
                  type="email"
                  value={user?.email || "tutor@gmail.com"}
                  disabled
                  className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant/30 rounded-xl font-body-md text-outline cursor-not-allowed outline-none select-none"
                />
              </div>

              {/* Profile Photo URL */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block font-label-md text-sm text-on-surface">Profile Photo URL</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {watchedFields.profilePhoto && watchedFields.profilePhoto.startsWith("http") && (
                    <img
                      src={watchedFields.profilePhoto}
                      alt="Profile Preview"
                      className="w-16 h-16 rounded-full object-cover border border-outline-variant/50 shadow-sm shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none"
                      }}
                    />
                  )}
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    {...register("profilePhoto")}
                    className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface ${
                      errors.profilePhoto ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                    }`}
                  />
                </div>
                {errors.profilePhoto && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.profilePhoto.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block font-label-md text-sm text-on-surface">Phone Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 017XXXXXXXX"
                  {...register("phoneNumber")}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface ${
                    errors.phoneNumber ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Short Bio */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block font-label-md text-sm text-on-surface">Short Bio *</label>
                <textarea
                  placeholder="Describe your teaching profile, motivation, and qualifications..."
                  rows={4}
                  {...register("bio")}
                  className={`w-full px-4 py-3 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface resize-none ${
                    errors.bio ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                />
                {errors.bio && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.bio.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Academic Information */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">school</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Academic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* University */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">University *</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka University"
                  {...register("university")}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface ${
                    errors.university ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                />
                {errors.university && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.university.message}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Department *</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  {...register("department")}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface ${
                    errors.department ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                />
                {errors.department && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.department.message}</p>
                )}
              </div>

              {/* Current Institution */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block font-label-md text-sm text-on-surface">Current Institution</label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka University (if current student) or company name"
                  {...register("currentInstitution")}
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Teaching Information */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">library_books</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Teaching Information</h3>
            </div>

            {/* Teaching Medium (Checkboxes) */}
            <div className="space-y-3">
              <label className="block font-label-md text-sm text-on-surface">Teaching Medium *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["Bangla", "English", "English Version"].map((med) => {
                  const isChecked = watchedFields.medium?.includes(med) || false
                  return (
                    <label
                      key={med}
                      className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all duration-200 select-none ${
                        isChecked
                          ? "border-primary bg-primary/10 text-primary font-semibold shadow-sm"
                          : "border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-low"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const currentMediums = watchedFields.medium || []
                          if (e.target.checked) {
                            setValue("medium", [...currentMediums, med], { shouldValidate: true })
                          } else {
                            setValue("medium", currentMediums.filter((m) => m !== med), { shouldValidate: true })
                          }
                        }}
                        className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary cursor-pointer accent-primary"
                      />
                      <span className="text-sm">{med}</span>
                    </label>
                  )
                })}
              </div>
              {errors.medium && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.medium.message}</p>
              )}
            </div>

            {/* Preferred Classes (Checkboxes) */}
            <div className="space-y-3">
              <label className="block font-label-md text-sm text-on-surface">Preferred Classes *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto border border-outline-variant/30 rounded-2xl p-4 bg-surface-container-lowest">
                {allAcademicLevels.map((lvl) => {
                  const isChecked = watchedFields.preferredClasses?.includes(lvl) || false
                  return (
                    <label
                      key={lvl}
                      className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all duration-200 select-none ${
                        isChecked
                          ? "border-primary bg-primary/10 text-primary font-semibold shadow-sm"
                          : "border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-low"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const currentClasses = watchedFields.preferredClasses || []
                          if (e.target.checked) {
                            setValue("preferredClasses", [...currentClasses, lvl], { shouldValidate: true })
                          } else {
                            setValue("preferredClasses", currentClasses.filter((c) => c !== lvl), { shouldValidate: true })
                          }
                        }}
                        className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary cursor-pointer accent-primary"
                      />
                      <span className="text-xs sm:text-sm">{lvl}</span>
                    </label>
                  )
                })}
              </div>
              {errors.preferredClasses && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.preferredClasses.message}</p>
              )}
            </div>

            {/* Teaching Subjects (Searchable Checkbox grid) */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="block font-label-md text-sm text-on-surface">Teaching Subjects *</label>
                <div className="relative w-full sm:max-w-xs">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                  <input
                    type="text"
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    placeholder="Search subjects..."
                    className="w-full h-9 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 text-xs placeholder:text-outline text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto border border-outline-variant/30 rounded-2xl p-4 bg-surface-container-lowest">
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((sub) => {
                    const isChecked = watchedFields.teachingSubjects?.includes(sub) || false
                    return (
                      <label
                        key={sub}
                        className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all duration-200 select-none ${
                          isChecked
                            ? "border-primary bg-primary/10 text-primary font-semibold shadow-sm"
                            : "border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-low"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const currentSubjects = watchedFields.teachingSubjects || []
                            if (e.target.checked) {
                              setValue("teachingSubjects", [...currentSubjects, sub], { shouldValidate: true })
                            } else {
                              setValue("teachingSubjects", currentSubjects.filter((s) => s !== sub), { shouldValidate: true })
                            }
                          }}
                          className="w-4 h-4 text-primary bg-surface-container-low border-outline-variant rounded focus:ring-primary cursor-pointer accent-primary"
                        />
                        <span className="text-xs sm:text-sm">{sub}</span>
                      </label>
                    )
                  })
                ) : (
                  <div className="col-span-full py-8 text-center text-on-surface-variant/60 text-sm font-body-md border border-dashed border-outline-variant/30 rounded-2xl bg-surface-container-low/30">
                    No subjects matched your search.
                  </div>
                )}
              </div>
              {errors.teachingSubjects && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.teachingSubjects.message}</p>
              )}
            </div>
          </div>

          {/* Section 4: Experience Details */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">military_tech</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Experience & Style</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Experience Years */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Years of Experience *</label>
                <input
                  type="number"
                  placeholder="e.g. 3"
                  {...register("experienceYears", { valueAsNumber: true })}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface ${
                    errors.experienceYears ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                />
                {errors.experienceYears && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.experienceYears.message}</p>
                )}
              </div>

              {/* Hourly Rate */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Hourly Rate (BDT/hr) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-outline">৳</span>
                  <input
                    type="number"
                    placeholder="e.g. 500"
                    {...register("hourlyRate", { valueAsNumber: true })}
                    className={`w-full h-12 pl-8 pr-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface ${
                      errors.hourlyRate ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                    }`}
                  />
                </div>
                {errors.hourlyRate && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.hourlyRate.message}</p>
                )}
              </div>

              {/* Teaching Style */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="block font-label-md text-sm text-on-surface">Teaching Style</label>
                <input
                  type="text"
                  placeholder="e.g. Interactive, Problem-Solving, Practical Applications"
                  {...register("teachingStyle")}
                  className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface"
                />
              </div>

              {/* Demo Class Switch */}
              <div className="md:col-span-2 py-2 flex items-center justify-between border border-outline-variant/20 rounded-2xl p-4 bg-surface-container-low/20">
                <div className="space-y-0.5">
                  <span className="text-sm font-bold text-on-surface">Free Demo Class</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Allow students to request a free 30-minute introductory lesson before booking.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                  <input
                    type="checkbox"
                    {...register("demoClassOffered")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-outline-variant/30 border border-outline-variant/30 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-outline-variant/30 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Section 5: Location Details */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
              <span className="material-symbols-outlined text-primary text-[28px] select-none">location_on</span>
              <h3 className="text-headline-sm font-bold text-on-surface">Location Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* District */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">District *</label>
                <select
                  value={watchedDistrict}
                  onChange={handleDistrictChange}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface cursor-pointer ${
                    errors.district ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                >
                  <option value="">Select District</option>
                  {allDistricts.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.district.message}</p>
                )}
              </div>

              {/* Area / Thana */}
              <div className="space-y-1.5">
                <label className="block font-label-md text-sm text-on-surface">Area / Thana *</label>
                <select
                  disabled={!watchedDistrict}
                  {...register("area")}
                  className={`w-full h-12 px-4 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md text-on-surface disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                    errors.area ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                  }`}
                >
                  <option value="">{watchedDistrict ? "Select Area" : "Select District First"}</option>
                  {availableAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {errors.area && (
                  <p className="text-red-500 text-xs font-semibold mt-1">{errors.area.message}</p>
                )}
              </div>
            </div>

            {/* Full Address */}
            <div className="space-y-1.5">
              <label className="block font-label-md text-sm text-on-surface">Full Address *</label>
              <textarea
                placeholder="Enter your full teaching or home address (e.g. House 12, Road 5, Mirpur DOHS, Dhaka)"
                rows={3}
                {...register("address")}
                className={`w-full px-4 py-3 bg-surface-container-lowest border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-200 font-body-md placeholder:text-outline text-on-surface resize-none ${
                  errors.address ? "border-red-500 focus:ring-red-500/20" : "border-outline-variant/50"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs font-semibold mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-10 bg-primary text-on-primary font-semibold text-sm rounded-xl hover:opacity-95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Saving..." : "Complete Profile"}</span>
              {isSubmitting ? (
                <span className="material-symbols-outlined text-[20px] animate-spin select-none">
                  progress_activity
                </span>
              ) : (
                <span className="material-symbols-outlined text-[20px] select-none">
                  check_circle
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Desktop Sidebar Completion Panel */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          {/* Circular Completion Badge */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-headline-sm font-bold text-on-surface">Profile Strength</h3>

            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#EFF4FF"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="var(--color-primary)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - completionPercentage / 100)}
                    className="transition-all duration-500 ease-out"
                    style={{ stroke: "color-mix(in srgb, var(--color-primary) 100%, transparent)" }}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-headline-lg font-bold text-on-surface">{completionPercentage}%</span>
                  <p className="text-[10px] text-on-surface-variant font-bold tracking-wider uppercase mt-0.5">
                    Completed
                  </p>
                </div>
              </div>

              <span className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider bg-surface-container-low border border-outline-variant/10 shadow-sm ${progressColorClass}`}>
                {profileStrength}
              </span>
            </div>

            {/* Checklist */}
            <div className="border-t border-outline-variant/30 pt-6 space-y-4">
              <h4 className="font-semibold text-sm text-on-surface">Details Checklist</h4>
              <ul className="space-y-3.5">
                {completionItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3.5">
                    <span className={`material-symbols-outlined text-[20px] select-none ${item.completed ? "text-primary font-bold" : "text-outline/40"}`}>
                      {item.completed ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    <span className={`text-sm ${item.completed ? "text-on-surface" : "text-on-surface-variant/60"}`}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Tips Panel */}
          <div className="rounded-[28px] border border-outline-variant/30 bg-white p-6 md:p-8 shadow-sm space-y-4">
            <h3 className="text-headline-sm font-bold text-on-surface">Quick Tips</h3>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li className="flex gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 select-none">lightbulb</span>
                <span><strong>Profile Photo:</strong> Use a clear, professional, and recent portrait to increase responses from guardians.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 select-none">lightbulb</span>
                <span><strong>Hourly Rate:</strong> Research the market average for your class level and subjects before setting your rate.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 select-none">lightbulb</span>
                <span><strong>Bio & Style:</strong> Be descriptive about your teaching methodology, accomplishments, and focus areas.</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

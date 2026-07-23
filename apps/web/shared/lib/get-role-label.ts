const ROLE_LABELS = {
  model: "مدل",
  instructor: "مدرس",
  employer: "کارفرما",
} as const;

export function getRoleLabel(role: string) {
  return ROLE_LABELS[role as keyof typeof ROLE_LABELS] ?? role;
}
